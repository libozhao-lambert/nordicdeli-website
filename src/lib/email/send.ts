import { Resend } from "resend";
import { ReservationOwnerEmail } from "./templates/reservation-owner";
import { ReservationGuestEmail } from "./templates/reservation-guest";
import { ContactNotificationEmail } from "./templates/contact-notification";
import type { Reservation } from "@/types/reservation";

const FROM_ADDRESS = "hello@anchornetwork.ai";
const OWNER_EMAIL = "admin@thenordicdeli.com";

/**
 * Sends two emails for a new reservation:
 * 1. Owner notification with full details + cancel link
 * 2. Guest confirmation with booking details + cancel link
 */
export async function sendReservationEmails(params: {
  reservation: Reservation;
  cancelUrl: string;
  resendApiKey: string;
}): Promise<void> {
  const { reservation, cancelUrl, resendApiKey } = params;
  const resend = new Resend(resendApiKey);

  const startDate = new Date(reservation.startAt);
  const dateStr = startDate.toLocaleDateString("en-AU", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "Australia/Brisbane",
  });

  // Send owner notification
  await resend.emails.send({
    from: FROM_ADDRESS,
    to: OWNER_EMAIL,
    subject: `New Reservation ${reservation.id} — ${reservation.customer.name}, ${reservation.people} pax on ${dateStr}`,
    react: ReservationOwnerEmail({ reservation, cancelUrl }),
  });

  // Send guest confirmation
  await resend.emails.send({
    from: FROM_ADDRESS,
    to: reservation.customer.email,
    subject: `Your reservation at The Nordic Deli is confirmed — ${reservation.id}`,
    react: ReservationGuestEmail({ reservation, cancelUrl }),
  });
}

/**
 * Sends a contact form notification to the owner.
 */
export async function sendContactEmail(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
  resendApiKey: string;
}): Promise<void> {
  const { name, email, subject, message, resendApiKey } = params;
  const resend = new Resend(resendApiKey);

  await resend.emails.send({
    from: FROM_ADDRESS,
    to: OWNER_EMAIL,
    replyTo: email,
    subject: `[Contact] ${subject} — from ${name}`,
    react: ContactNotificationEmail({ name, email, subject, message }),
  });
}
