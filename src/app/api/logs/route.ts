import { NextResponse } from "next/server";
import { getLogs } from "@/lib/blog";

/**
 * Handles GET requests to retrieve the list of execution log posts as a JSON response.
 */
export async function GET() {
  try {
    const logs = await getLogs();
    return NextResponse.json(logs);
  } catch {
    return NextResponse.json({ error: "Failed to load logs" }, { status: 500 });
  }
}
