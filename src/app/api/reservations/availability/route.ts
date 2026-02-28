import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { computeAvailableSlots } from "@/lib/availability";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    // Validate date param
    if (!date) {
      return NextResponse.json(
        { error: "Missing required query parameter: date" },
        { status: 400 }
      );
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { error: "Date must be in YYYY-MM-DD format" },
        { status: 400 }
      );
    }

    // Validate it's a real date
    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) {
      return NextResponse.json(
        { error: "Invalid date" },
        { status: 400 }
      );
    }

    const { env } = getCloudflareContext();
    const slots = await computeAvailableSlots(date, env);

    return NextResponse.json(
      { slots, date },
      {
        status: 200,
        headers: {
          // Short cache — availability changes frequently
          "Cache-Control": "public, max-age=30, s-maxage=30",
        },
      }
    );
  } catch (error) {
    console.error("Availability GET error:", error);
    return NextResponse.json(
      { error: "Failed to compute availability" },
      { status: 500 }
    );
  }
}
