import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

const FRED_API_KEY = process.env.FRED_API_KEY;
const CRON_SECRET = process.env.CRON_SECRET;

const fetchRate = async (seriesId) => {
  const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${FRED_API_KEY}&file_type=json&sort_order=desc&limit=1`;
  const res = await fetch(url);
  const json = await res.json();
  const obs = json.observations?.[0];

  if (!obs || obs.value === ".") {
    throw new Error(`No valid observation for ${seriesId}`);
  }

  return {
    rate: parseFloat(obs.value),
    date: obs.date, // FRED’s date (YYYY-MM-DD)
  };
};

const mergeDateAndTime = (fredDate) => {
  const datePart = new Date(fredDate).toISOString().split("T")[0];
  const timePart = new Date().toTimeString().split(" ")[0];
  return `${datePart} ${timePart}`;
};

export async function GET(req) {
  const auth = req.headers.get("Authorization");

  if (auth !== `Bearer ${CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const [r30, r15] = await Promise.all([
      fetchRate("MORTGAGE30US"),
      fetchRate("MORTGAGE15US"),
    ]);

    const data = {
      rates: {
        "30yr_fixed": r30.rate,
        "15yr_fixed": r15.rate,
      },
      lastUpdated: mergeDateAndTime(r30.date), // FRED's date + current time
    };

    const filePath = path.join(process.cwd(), "app/data/defaultRates.json");
    await writeFile(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, updated: data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
