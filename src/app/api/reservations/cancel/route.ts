import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { verifyCancellationToken } from "@/lib/hmac";
import { cancelReservation } from "@/lib/kv/reservations";
import { Resend } from "resend";

const cancelSchema = z.object({
  token: z.string().min(1, "Token is required"),
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

    const parsed = cancelSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { token } = parsed.data;
    const hmacSecret = env.HMAC_SECRET ?? "default-dev-secret";

    // 1. Verify HMAC token
    const reservationId = await verifyCancellationToken(token, hmacSecret);
    if (!reservationId) {
      return NextResponse.json(
        { error: "Invalid or expired cancellation link." },
        { status: 403 }
      );
    }

    // 2. Cancel reservation in KV
    const reservation = await cancelReservation(reservationId);
    if (!reservation) {
      return NextResponse.json(
        { error: "Reservation not found." },
        { status: 404 }
      );
    }

    if (reservation.status === "cancelled") {
      // Already cancelled — idempotent response
      return NextResponse.json({ ok: true, id: reservationId });
    }

    // 3. Notify owner via Resend
    try {
      const resend = new Resend(env.RESEND_API_KEY ?? "");
      const startDate = new Date(reservation.startAt);
      const dateStr = startDate.toLocaleDateString("en-AU", {
        weekday: "long",
        month: "long",
        day: "numeric",
        timeZone: "Australia/Brisbane",
      });
      const timeStr = startDate.toLocaleTimeString("en-AU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Australia/Brisbane",
      });

      await resend.emails.send({
        from: "hello@anchornetwork.ai",
        to: "admin@thenordicdeli.com",
        subject: `Reservation Cancelled: ${reservationId} — ${reservation.customer.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #1F4A1F;">Reservation Cancelled</h2>
            <p>The following reservation has been cancelled:</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; color: #666; font-size: 13px; text-transform: uppercase;">Booking ID</td><td style="padding: 8px; font-weight: 600;">${reservationId}</td></tr>
              <tr><td style="padding: 8px; color: #666; font-size: 13px; text-transform: uppercase;">Guest</td><td style="padding: 8px;">${reservation.customer.name}</td></tr>
              <tr><td style="padding: 8px; color: #666; font-size: 13px; text-transform: uppercase;">Phone</td><td style="padding: 8px;">${reservation.customer.phone}</td></tr>
              <tr><td style="padding: 8px; color: #666; font-size: 13px; text-transform: uppercase;">Email</td><td style="padding: 8px;">${reservation.customer.email}</td></tr>
              <tr><td style="padding: 8px; color: #666; font-size: 13px; text-transform: uppercase;">Date</td><td style="padding: 8px;">${dateStr}</td></tr>
              <tr><td style="padding: 8px; color: #666; font-size: 13px; text-transform: uppercase;">Time</td><td style="padding: 8px;">${timeStr}</td></tr>
              <tr><td style="padding: 8px; color: #666; font-size: 13px; text-transform: uppercase;">Party Size</td><td style="padding: 8px;">${reservation.people}</td></tr>
            </table>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send cancellation notification:", emailError);
    }

    return NextResponse.json({ ok: true, id: reservationId });
  } catch (error) {
    console.error("Cancel POST error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
