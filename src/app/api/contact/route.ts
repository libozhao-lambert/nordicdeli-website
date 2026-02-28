import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { extractIP, hashIP } from "@/lib/ip";
import { checkRateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { sendContactEmail } from "@/lib/email/send";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(2, "Please enter a subject").max(200),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000),
  website: z.string().max(0, "Bot detected").optional().default(""),
  "cf-turnstile-response": z
    .string()
    .min(1, "Please complete the security check"),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { env } = getCloudflareContext();

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    // 1. Validate
    const parsed = contactSchema.safeParse(body);
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

    // 2. Honeypot check
    if (data.website && data.website.length > 0) {
      return NextResponse.json({ error: "Bot detected" }, { status: 400 });
    }

    // 3. Rate limit
    const ip = extractIP(request);
    const hmacSecret = env.HMAC_SECRET ?? "default-dev-secret";
    const hashedIP = await hashIP(ip, hmacSecret);

    const rateLimit = await checkRateLimit(
      env.RESERVATIONS_KV,
      `rl:contact:${hashedIP}`,
      5,
      300
    );

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "Too many messages sent. Please wait a few minutes before trying again.",
          retryAfter: rateLimit.retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfter ?? 300),
          },
        }
      );
    }

    // 4. Verify Turnstile
    const turnstileSecret = env.CF_TURNSTILE_SECRET_KEY_CONTACT ?? "";
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

    // 5. Send email
    await sendContactEmail({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      resendApiKey: env.RESEND_API_KEY ?? "",
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact POST error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
