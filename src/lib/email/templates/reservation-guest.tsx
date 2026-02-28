import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Hr,
  Section,
  Preview,
  Row,
  Column,
  Link,
} from "@react-email/components";
import type { Reservation } from "@/types/reservation";

interface ReservationGuestEmailProps {
  reservation: Reservation;
  cancelUrl: string;
}

export function ReservationGuestEmail({
  reservation,
  cancelUrl,
}: ReservationGuestEmailProps) {
  const { id, customer, people, startAt, durationMin } = reservation;

  const startDate = new Date(startAt);
  const dateStr = startDate.toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
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

  const endDate = new Date(startDate.getTime() + durationMin * 60 * 1000);
  const endTimeStr = endDate.toLocaleTimeString("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Australia/Brisbane",
  });

  return (
    <Html lang="en">
      <Preview>
        Your table is booked, {customer.name.split(" ")[0]}! See you on {dateStr} at {timeStr}.
      </Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Warm cream header */}
          <Section style={header}>
            <Heading style={headerHeading}>The Nordic Deli</Heading>
            <Text style={tagline}>Warmth · Comfort · Hygge</Text>
          </Section>

          {/* Confirmation message */}
          <Section style={heroSection}>
            <Heading as="h2" style={heroHeading}>
              Your Table is Confirmed!
            </Heading>
            <Text style={heroText}>
              Hej {customer.name.split(" ")[0]}! We&apos;re so looking forward to welcoming you. Here are your reservation details:
            </Text>
          </Section>

          {/* Booking ID badge */}
          <Section style={{ padding: "0 40px 24px" }}>
            <div style={bookingBadge}>
              <Text style={bookingLabel}>Booking Reference</Text>
              <Text style={bookingId}>{id}</Text>
            </div>
          </Section>

          {/* Details card */}
          <Section style={cardSection}>
            <div style={detailsCard}>
              <Row style={detailRow}>
                <Column style={iconCol}>
                  <Text style={icon}>📅</Text>
                </Column>
                <Column>
                  <Text style={detailLabel}>Date</Text>
                  <Text style={detailValue}>{dateStr}</Text>
                </Column>
              </Row>
              <Hr style={innerDivider} />
              <Row style={detailRow}>
                <Column style={iconCol}>
                  <Text style={icon}>🕐</Text>
                </Column>
                <Column>
                  <Text style={detailLabel}>Time</Text>
                  <Text style={detailValue}>{timeStr} – {endTimeStr}</Text>
                </Column>
              </Row>
              <Hr style={innerDivider} />
              <Row style={detailRow}>
                <Column style={iconCol}>
                  <Text style={icon}>👥</Text>
                </Column>
                <Column>
                  <Text style={detailLabel}>Party Size</Text>
                  <Text style={detailValue}>{people} {people === 1 ? "guest" : "guests"}</Text>
                </Column>
              </Row>
              <Hr style={innerDivider} />
              <Row style={detailRow}>
                <Column style={iconCol}>
                  <Text style={icon}>📍</Text>
                </Column>
                <Column>
                  <Text style={detailLabel}>Location</Text>
                  <Text style={detailValue}>
                    The Nordic Deli{"\n"}
                    Shop 15/10 Santa Barbara Rd{"\n"}
                    Hope Island QLD 4212
                  </Text>
                </Column>
              </Row>
            </div>
          </Section>

          {/* Hours note */}
          <Section style={{ padding: "0 40px 24px" }}>
            <Text style={infoText}>
              We are open daily from <strong>6:30am to 2:30pm</strong>. We hold tables for up to 15 minutes after the reservation time.
            </Text>
          </Section>

          {/* Cancellation */}
          <Section style={cancelSection}>
            <Text style={cancelText}>
              Need to cancel? Please give us at least 24 hours notice.
            </Text>
            <Button href={cancelUrl} style={cancelButton}>
              Cancel Reservation
            </Button>
            <Text style={cancelSubtext}>
              Or <Link href={`mailto:admin@thenordicdeli.com`} style={emailLink}>email us</Link> · <Link href="tel:+61420960821" style={emailLink}>+61 420 960 821</Link>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={footerDivider} />
            <Text style={footerText}>
              The Nordic Deli · Shop 15/10 Santa Barbara Rd, Hope Island QLD 4212
            </Text>
            <Text style={footerText}>
              <Link href="https://nordicdeli.anchornetwork.ai" style={footerLink}>
                nordicdeli.anchornetwork.ai
              </Link>
            </Text>
            <Text style={footerMuted}>
              You received this email because you made a reservation at The Nordic Deli.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const body: React.CSSProperties = {
  backgroundColor: "#E8DDD0",
  fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  margin: 0,
  padding: "24px 0",
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  maxWidth: "600px",
  margin: "0 auto",
  overflow: "hidden",
  boxShadow: "0 4px 24px rgba(45,45,45,0.1)",
};

const header: React.CSSProperties = {
  background: "linear-gradient(135deg, #1F4A1F 0%, #3D6B3D 100%)",
  padding: "36px 40px",
  textAlign: "center",
};

const headerHeading: React.CSSProperties = {
  color: "#F5F0E8",
  fontFamily: "Georgia, serif",
  fontSize: "32px",
  fontWeight: "700",
  margin: "0 0 6px",
  letterSpacing: "-0.5px",
};

const tagline: React.CSSProperties = {
  color: "#D4A96A",
  fontSize: "13px",
  letterSpacing: "3px",
  textTransform: "uppercase",
  margin: 0,
};

const heroSection: React.CSSProperties = {
  padding: "36px 40px 24px",
  textAlign: "center",
};

const heroHeading: React.CSSProperties = {
  color: "#1F4A1F",
  fontFamily: "Georgia, serif",
  fontSize: "26px",
  fontWeight: "600",
  margin: "0 0 12px",
};

const heroText: React.CSSProperties = {
  color: "#3d3d3d",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: 0,
};

const bookingBadge: React.CSSProperties = {
  backgroundColor: "#f0f5f0",
  border: "2px solid #d6e8d6",
  borderRadius: "12px",
  padding: "16px 24px",
  textAlign: "center",
};

const bookingLabel: React.CSSProperties = {
  color: "#3D6B3D",
  fontSize: "11px",
  fontWeight: "600",
  letterSpacing: "2px",
  margin: "0 0 4px",
  textTransform: "uppercase",
};

const bookingId: React.CSSProperties = {
  color: "#1F4A1F",
  fontSize: "24px",
  fontWeight: "700",
  letterSpacing: "3px",
  margin: 0,
};

const cardSection: React.CSSProperties = {
  padding: "0 40px 24px",
};

const detailsCard: React.CSSProperties = {
  backgroundColor: "#fdfaf4",
  border: "1px solid #E8DDD0",
  borderRadius: "12px",
  padding: "8px 24px",
};

const detailRow: React.CSSProperties = {
  padding: "12px 0",
};

const iconCol: React.CSSProperties = {
  width: "40px",
};

const icon: React.CSSProperties = {
  fontSize: "20px",
  margin: "0",
};

const detailLabel: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: "11px",
  fontWeight: "600",
  letterSpacing: "1px",
  margin: "0 0 2px",
  textTransform: "uppercase",
};

const detailValue: React.CSSProperties = {
  color: "#1A1A1A",
  fontSize: "15px",
  fontWeight: "500",
  margin: 0,
  whiteSpace: "pre-line",
};

const innerDivider: React.CSSProperties = {
  borderColor: "#E8DDD0",
  margin: "0",
};

const infoText: React.CSSProperties = {
  backgroundColor: "#faf4e6",
  border: "1px solid #f0d8a8",
  borderRadius: "8px",
  color: "#3d3d3d",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: 0,
  padding: "12px 16px",
};

const cancelSection: React.CSSProperties = {
  backgroundColor: "#fafafa",
  borderTop: "1px solid #E8DDD0",
  padding: "28px 40px",
  textAlign: "center",
};

const cancelText: React.CSSProperties = {
  color: "#6b7280",
  fontSize: "14px",
  margin: "0 0 16px",
};

const cancelButton: React.CSSProperties = {
  backgroundColor: "#F5F0E8",
  border: "2px solid #d4c4b0",
  borderRadius: "8px",
  color: "#3d3d3d",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "600",
  padding: "12px 28px",
  textDecoration: "none",
};

const cancelSubtext: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: "13px",
  margin: "16px 0 0",
};

const emailLink: React.CSSProperties = {
  color: "#3D6B3D",
  textDecoration: "underline",
};

const footer: React.CSSProperties = {
  padding: "24px 40px",
};

const footerDivider: React.CSSProperties = {
  borderColor: "#E8DDD0",
  margin: "0 0 20px",
};

const footerText: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: "12px",
  textAlign: "center",
  margin: "4px 0",
};

const footerLink: React.CSSProperties = {
  color: "#9ca3af",
  textDecoration: "underline",
};

const footerMuted: React.CSSProperties = {
  color: "#c4b9ac",
  fontSize: "11px",
  textAlign: "center",
  margin: "12px 0 0",
};

export default ReservationGuestEmail;
