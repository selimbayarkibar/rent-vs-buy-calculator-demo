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
          "30yr_fixed": 6.77,
          "15yr_fixed": 5.89,
        },
        lastUpdated: "2025-06-26 18:09:12",
      },
      { status: 200 }
    );
  }
}
