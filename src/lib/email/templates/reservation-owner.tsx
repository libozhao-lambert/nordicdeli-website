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
} from "@react-email/components";
import type { Reservation } from "@/types/reservation";

interface ReservationOwnerEmailProps {
  reservation: Reservation;
  cancelUrl: string;
}

export function ReservationOwnerEmail({
  reservation,
  cancelUrl,
}: ReservationOwnerEmailProps) {
  const { id, customer, people, startAt, note } = reservation;

  // Format date and time from ISO string
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

  return (
    <Html lang="en">
      <Preview>{`New reservation ${id} — ${customer.name}, ${people} ${people === 1 ? "person" : "people"} on ${dateStr}`}</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerHeading}>The Nordic Deli</Heading>
            <Text style={headerSubtitle}>New Reservation Notification</Text>
          </Section>

          {/* Booking ID */}
          <Section style={section}>
            <Text style={bookingId}>Booking ID: {id}</Text>
          </Section>

          {/* Details */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>Reservation Details</Heading>
            <Hr style={divider} />

            <Row style={detailRow}>
              <Column style={labelCol}><Text style={label}>Guest Name</Text></Column>
              <Column style={valueCol}><Text style={value}>{customer.name}</Text></Column>
            </Row>
            <Row style={detailRow}>
              <Column style={labelCol}><Text style={label}>Phone</Text></Column>
              <Column style={valueCol}><Text style={value}>{customer.phone}</Text></Column>
            </Row>
            <Row style={detailRow}>
              <Column style={labelCol}><Text style={label}>Email</Text></Column>
              <Column style={valueCol}><Text style={value}>{customer.email}</Text></Column>
            </Row>
            <Row style={detailRow}>
              <Column style={labelCol}><Text style={label}>Date</Text></Column>
              <Column style={valueCol}><Text style={value}>{dateStr}</Text></Column>
            </Row>
            <Row style={detailRow}>
              <Column style={labelCol}><Text style={label}>Time</Text></Column>
              <Column style={valueCol}><Text style={value}>{timeStr}</Text></Column>
            </Row>
            <Row style={detailRow}>
              <Column style={labelCol}><Text style={label}>Party Size</Text></Column>
              <Column style={valueCol}><Text style={value}>{people} {people === 1 ? "person" : "people"}</Text></Column>
            </Row>
            {note && (
              <Row style={detailRow}>
                <Column style={labelCol}><Text style={label}>Notes</Text></Column>
                <Column style={valueCol}><Text style={value}>{note}</Text></Column>
              </Row>
            )}
          </Section>

          {/* Cancel Action */}
          <Section style={{ ...section, textAlign: "center" as const }}>
            <Text style={mutedText}>Need to cancel this reservation on behalf of the guest?</Text>
            <Button href={cancelUrl} style={cancelButton}>
              Cancel Reservation
            </Button>
          </Section>

          {/* Footer */}
          <Hr style={divider} />
          <Section>
            <Text style={footerText}>
              The Nordic Deli · Shop 15/10 Santa Barbara Rd, Hope Island QLD 4212
            </Text>
            <Text style={footerText}>
              Phone: +61 420 960 821 · admin@thenordicdeli.com
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const body: React.CSSProperties = {
  backgroundColor: "#f4f4f5",
  fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  margin: 0,
  padding: "24px 0",
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  maxWidth: "600px",
  margin: "0 auto",
  overflow: "hidden",
};

const header: React.CSSProperties = {
  backgroundColor: "#1F4A1F",
  padding: "32px 40px",
  textAlign: "center",
};

const headerHeading: React.CSSProperties = {
  color: "#F5F0E8",
  fontFamily: "Georgia, serif",
  fontSize: "28px",
  fontWeight: "700",
  margin: "0 0 4px",
  letterSpacing: "-0.5px",
};

const headerSubtitle: React.CSSProperties = {
  color: "#D4A96A",
  fontSize: "14px",
  margin: 0,
  letterSpacing: "1px",
  textTransform: "uppercase",
};

const section: React.CSSProperties = {
  padding: "24px 40px",
};

const sectionHeading: React.CSSProperties = {
  color: "#1A1A1A",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0 0 16px",
};

const bookingId: React.CSSProperties = {
  backgroundColor: "#f0f5f0",
  border: "1px solid #d6e8d6",
  borderRadius: "8px",
  color: "#1F4A1F",
  fontSize: "18px",
  fontWeight: "700",
  padding: "12px 20px",
  margin: 0,
  letterSpacing: "1px",
};

const divider: React.CSSProperties = {
  borderColor: "#E8DDD0",
  margin: "0 0 16px",
};

const detailRow: React.CSSProperties = {
  marginBottom: "8px",
};

const labelCol: React.CSSProperties = {
  width: "140px",
};

const valueCol: React.CSSProperties = {};

const label: React.CSSProperties = {
  color: "#6b7280",
  fontSize: "13px",
  fontWeight: "500",
  margin: "4px 0",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const value: React.CSSProperties = {
  color: "#1A1A1A",
  fontSize: "15px",
  fontWeight: "400",
  margin: "4px 0",
};

const mutedText: React.CSSProperties = {
  color: "#6b7280",
  fontSize: "14px",
  margin: "0 0 16px",
};

const cancelButton: React.CSSProperties = {
  backgroundColor: "#dc2626",
  borderRadius: "8px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "600",
  padding: "12px 24px",
  textDecoration: "none",
};

const footerText: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: "12px",
  textAlign: "center",
  margin: "4px 0",
  padding: "0 40px",
};

export default ReservationOwnerEmail;
