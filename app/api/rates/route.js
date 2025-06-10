// app/api/rates/route.js
import { readFile } from "fs/promises";

export async function GET() {
  try {
    const data = await readFile("/tmp/defaultRates.json", "utf-8");
    return new Response(data, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return Response.json(
      {
        rates: {
          "30yr_fixed": 6.85,
          "15yr_fixed": 5.89,
        },
        lastUpdated: "2025-06-05 11:15:11",
      },
      { status: 200 }
    );
  }
}
