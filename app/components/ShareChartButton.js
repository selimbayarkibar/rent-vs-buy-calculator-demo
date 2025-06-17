"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { generateAmortizationSchedule } from "@/lib/mortgage/amortizationSchedule";
import { downloadCSV } from "@/lib/exportUtils";
import defaultMortgageValues from "@/data/defaultMortgageValues.json";

export default function ShareChartButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleDownload() {
    const values = { ...defaultMortgageValues };
    for (const [key, value] of searchParams.entries()) {
      values[key] = isNaN(value) ? value : parseFloat(value);
    }

    const schedule = generateAmortizationSchedule(values);
    downloadCSV(schedule, "mortgage_schedule.csv");
  }

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 hover:cursor-pointer text-sm"
    >
      Download Schedule CSV{" "}
    </button>
  );
}
