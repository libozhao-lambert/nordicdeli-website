import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Section,
  Preview,
  Row,
  Column,
  Link,
} from "@react-email/components";

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactNotificationEmail({
  name,
  email,
  subject,
  message,
}: ContactNotificationEmailProps) {
  const receivedAt = new Date().toLocaleString("en-AU", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Australia/Brisbane",
    timeZoneName: "short",
  });

  return (
    <Html lang="en">
      <Preview>New contact message from {name} — {subject}</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerHeading}>The Nordic Deli</Heading>
            <Text style={headerSubtitle}>New Contact Message</Text>
          </Section>

          {/* Intro */}
          <Section style={section}>
            <Text style={introText}>
              You have received a new message through the website contact form.
            </Text>
            <Text style={receivedText}>Received: {receivedAt}</Text>
          </Section>

          {/* Sender details */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>Sender Details</Heading>
            <Hr style={divider} />

            <Row style={detailRow}>
              <Column style={labelCol}><Text style={label}>Name</Text></Column>
              <Column><Text style={value}>{name}</Text></Column>
            </Row>
            <Row style={detailRow}>
              <Column style={labelCol}><Text style={label}>Email</Text></Column>
              <Column>
                <Text style={value}>
                  <Link href={`mailto:${email}`} style={link}>{email}</Link>
                </Text>
              </Column>
            </Row>
            <Row style={detailRow}>
              <Column style={labelCol}><Text style={label}>Subject</Text></Column>
              <Column><Text style={value}>{subject}</Text></Column>
            </Row>
          </Section>

          {/* Message */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>Message</Heading>
            <Hr style={divider} />
            <div style={messageBox}>
              <Text style={messageText}>{message}</Text>
            </div>
          </Section>

          {/* Reply CTA */}
          <Section style={section}>
            <Text style={replyNote}>
              To reply, simply respond to this email or click:{" "}
              <Link href={`mailto:${email}?subject=Re: ${encodeURIComponent(subject)}`} style={link}>
                Reply to {name}
              </Link>
            </Text>
          </Section>

          {/* Footer */}
          <Hr style={footerDivider} />
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
  padding: "28px 40px",
  textAlign: "center",
};

const headerHeading: React.CSSProperties = {
  color: "#F5F0E8",
  fontFamily: "Georgia, serif",
  fontSize: "26px",
  fontWeight: "700",
  margin: "0 0 4px",
  letterSpacing: "-0.5px",
};

const headerSubtitle: React.CSSProperties = {
  color: "#D4A96A",
  fontSize: "13px",
  margin: 0,
  letterSpacing: "1.5px",
  textTransform: "uppercase",
};

const section: React.CSSProperties = {
  padding: "20px 40px",
};

const sectionHeading: React.CSSProperties = {
  color: "#1A1A1A",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0 0 12px",
};

const introText: React.CSSProperties = {
  color: "#3d3d3d",
  fontSize: "15px",
  lineHeight: "1.5",
  margin: "0 0 8px",
};

const receivedText: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: "13px",
  margin: 0,
};

const divider: React.CSSProperties = {
  borderColor: "#E8DDD0",
  margin: "0 0 16px",
};

const detailRow: React.CSSProperties = {
  marginBottom: "8px",
};

const labelCol: React.CSSProperties = {
  width: "100px",
};

const label: React.CSSProperties = {
  color: "#6b7280",
  fontSize: "12px",
  fontWeight: "600",
  margin: "4px 0",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const value: React.CSSProperties = {
  color: "#1A1A1A",
  fontSize: "15px",
  margin: "4px 0",
};

const link: React.CSSProperties = {
  color: "#3D6B3D",
  textDecoration: "underline",
};

const messageBox: React.CSSProperties = {
  backgroundColor: "#fdfaf4",
  border: "1px solid #E8DDD0",
  borderRadius: "8px",
  padding: "16px 20px",
};

const messageText: React.CSSProperties = {
  color: "#1A1A1A",
  fontSize: "15px",
  lineHeight: "1.7",
  margin: 0,
  whiteSpace: "pre-wrap",
};

const replyNote: React.CSSProperties = {
  backgroundColor: "#f0f5f0",
  border: "1px solid #d6e8d6",
  borderRadius: "8px",
  color: "#3d3d3d",
  fontSize: "14px",
  padding: "12px 16px",
  margin: 0,
};

const footerDivider: React.CSSProperties = {
  borderColor: "#E8DDD0",
  margin: "0 40px",
};

const footerText: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: "12px",
  textAlign: "center",
  margin: "8px 0",
  padding: "0 40px",
};

export default ContactNotificationEmail;
