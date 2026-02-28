import { ImageResponse } from "next/og";

export const alt = "The Nordic Deli — Nordic-inspired café in Hope Island, Gold Coast";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1F4A1F",
          padding: "60px",
        }}
      >
        {/* Decorative border */}
        <div
          style={{
            position: "absolute",
            inset: "20px",
            border: "1px solid rgba(212, 169, 106, 0.4)",
            borderRadius: "24px",
          }}
        />

        {/* Logo / Name */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "72px",
            fontWeight: "700",
            color: "#F5F0E8",
            letterSpacing: "-1px",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: "20px",
          }}
        >
          The Nordic Deli
        </div>

        {/* Divider */}
        <div
          style={{
            width: "80px",
            height: "2px",
            backgroundColor: "#D4A96A",
            marginBottom: "20px",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "28px",
            fontWeight: "300",
            color: "#D4A96A",
            letterSpacing: "3px",
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          Nordic · Café · Bakery
        </div>

        {/* Location */}
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "20px",
            color: "rgba(245, 240, 232, 0.7)",
            textAlign: "center",
          }}
        >
          Hope Island · Gold Coast · Australia
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
