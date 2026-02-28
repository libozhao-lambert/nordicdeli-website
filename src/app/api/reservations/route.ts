import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { generateReservationId } from "@/lib/reservation-id";
import { extractIP, hashIP } from "@/lib/ip";
import { checkRateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { computeAvailableSlots } from "@/lib/availability";
import { saveReservation } from "@/lib/kv/reservations";
import { createCancellationToken } from "@/lib/hmac";
import { sendReservationEmails } from "@/lib/email/send";
import type { Reservation } from "@/types/reservation";

const reservationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().min(6, "Please enter a valid phone number").max(30),
  email: z.string().email("Please enter a valid email address"),
  people: z
    .number({ invalid_type_error: "Party size must be a number" })
    .int()
    .min(1, "At least 1 person required")
    .max(12, "Maximum 12 people per reservation"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Time must be in HH:mm format"),
  note: z.string().max(500).optional().default(""),
  website: z.string().max(0, "Bot detected").optional().default(""),
  "cf-turnstile-response": z
    .string()
    .min(1, "Please complete the security check"),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { env } = getCloudflareContext();

    // 1. Parse JSON body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    // 2. Validate with Zod
    const parsed = reservationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const data = parsed.data;

    // 3. Honeypot check
    if (data.website && data.website.length > 0) {
      return NextResponse.json({ error: "Bot detected" }, { status: 400 });
    }

    // 4. Extract IP and hash it
    const ip = extractIP(request);
    const hmacSecret = env.HMAC_SECRET ?? "default-dev-secret";
    const hashedIP = await hashIP(ip, hmacSecret);
    const phoneHash = await hashIP(data.phone, hmacSecret);

    // 5. Rate limit checks
    const ipRateLimit = await checkRateLimit(
      env.RESERVATIONS_KV,
      `rl:ip:${hashedIP}`,
      10,
      600
    );
    if (!ipRateLimit.success) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: ipRateLimit.retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(ipRateLimit.retryAfter ?? 600),
          },
        }
      );
    }

    const phoneRateLimit = await checkRateLimit(
      env.RESERVATIONS_KV,
      `rl:phone:${phoneHash}`,
      3,
      3600
    );
    if (!phoneRateLimit.success) {
      return NextResponse.json(
        {
          error: "Too many reservations from this phone number. Please call us directly.",
          retryAfter: phoneRateLimit.retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(phoneRateLimit.retryAfter ?? 3600),
          },
        }
      );
    }

    // 6. Verify Turnstile
    const turnstileSecret = env.CF_TURNSTILE_SECRET_KEY_RESERVATIONS ?? "";
    const turnstileResult = await verifyTurnstile(
      data["cf-turnstile-response"],
      turnstileSecret,
      ip !== "unknown" ? ip : undefined
    );

    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: "Security check failed. Please try again." },
        { status: 403 }
      );
    }

    // 7. Availability check
    const availableSlots = await computeAvailableSlots(data.date, env);
    if (!availableSlots.includes(data.time)) {
      return NextResponse.json(
        {
          error: "This time slot is no longer available. Please choose another time.",
        },
        { status: 409 }
      );
    }

    // 8. Generate reservation ID
    const id = generateReservationId();
    const requestId = crypto.randomUUID();

    // 9. Build Reservation object
    // Construct AEST ISO 8601 datetime
    const startAt = `${data.date}T${data.time}:00+10:00`;

    const reservation: Reservation = {
      id,
      createdAt: new Date().toISOString(),
      customer: {
        name: data.name,
        phone: data.phone,
        email: data.email,
      },
      people: data.people,
      startAt,
      durationMin: 90,
      note: data.note ?? "",
      status: "confirmed",
      meta: {
        ipHash: hashedIP,
        requestId,
      },
    };

    // 10. Save reservation
    await saveReservation(reservation);

    // 11. Create cancellation token
    const cancelToken = await createCancellationToken(id, hmacSecret);

    // 12. Build cancel URL
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://nordicdeli.anchornetwork.ai";
    const cancelUrl = `${siteUrl}/reserve/cancel?token=${encodeURIComponent(cancelToken)}`;

    // 13. Send emails (don't let email failure block confirmation)
    try {
      await sendReservationEmails({
        reservation,
        cancelUrl,
        resendApiKey: env.RESEND_API_KEY ?? "",
      });
    } catch (emailError) {
      console.error("Failed to send reservation emails:", emailError);
      // Continue — reservation is saved, email failure is non-critical
    }

    // 14. Return confirmation
    return NextResponse.json({ id, status: "confirmed" }, { status: 201 });
  } catch (error) {
    console.error("Reservation POST error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
