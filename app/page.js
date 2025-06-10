"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { CalculatorForm } from "@/components/CalculatorForm";
import RentVsBuyGraph from "@/components/ResultChart";
import { Button } from "@/components/ui/button";
import ResultsTable from "@/components/ResultsTable";
import defaultValues from "@/data/defaultValues.json";

const fallbackRates = {
  rates: {
    "30yr_fixed": 7.068,
    "15yr_fixed": 6.03,
  },
  lastUpdated: "N/A",
};

function HomeContent() {
  const searchParams = useSearchParams();
  const [formValues, setFormValues] = useState(null);
  const [activeYear, setActiveYear] = useState(3);
  const [graphData, setGraphData] = useState([]);
  const [rateMeta, setRateMeta] = useState(fallbackRates);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function loadDefaults() {
      try {
        const res = await fetch("/api/rates");
        const rateData = await res.json();

        const base = {
          ...defaultValues,
          interestRate:
            rateData.rates?.["30yr_fixed"] ?? fallbackRates.rates["30yr_fixed"],
        };

        setRateMeta(rateData);
        const values = { ...base };

        for (const [key, value] of searchParams.entries()) {
          values[key] = isNaN(value) ? value : parseFloat(value);
        }

        setFormValues(values);
      } catch (err) {
        console.error("Failed to load rates, using fallback", err);
        const values = {
          ...defaultValues,
          interestRate: fallbackRates.rates["30yr_fixed"],
        };

        setFormValues(values);
        setRateMeta(fallbackRates);
      }
    }

    loadDefaults();
  }, [searchParams]);

  function handleShare() {
    const params = new URLSearchParams();
    Object.entries(formValues).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.set(key, value);
      }
    });
    const url = `${window.location.origin}${pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url);
    alert("Custom calculator link copied to clipboard!");
  }

  if (!formValues) {
    return <div className="p-8">Loading calculator...</div>;
  }

  const yearData = graphData.find((d) => d.year === activeYear) || {};

  return (
    <main className="flex flex-col lg:flex-row p-4 lg:p-8 min-h-screen bg-gray-50">
      <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
        <CalculatorForm values={formValues} onChange={setFormValues} />
      </div>

      <div className="w-full lg:w-2/3 flex flex-col text-gray-600 text-lg border-2 lg:ml-6">
        <div className="border-b border-gray-300 pb-20">
          <RentVsBuyGraph
            {...formValues}
            activeYear={activeYear}
            onYearChange={setActiveYear}
            onGraphDataChange={setGraphData}
          />
        </div>

        <ResultsTable activeYear={activeYear} yearData={yearData} />

        <div className="flex flex-col sm:flex-row items-center justify-center py-4 border-t border-gray-200 gap-4">
          <Button
            onClick={handleShare}
            className="bg-blue-600 hover:cursor-pointer hover:bg-blue-700"
          >
            Share Custom Values
          </Button>
          <Button
            onClick={() => {
              setFormValues({
                ...defaultValues,
                interestRate: rateMeta.rates["30yr_fixed"],
              });
              router.push("/");
            }}
            variant="outline"
            className="hover:cursor-pointer"
          >
            Reset to Default Values
          </Button>
        </div>

        <p className="text-sm text-center text-gray-700 mt-2 px-4">
          * Interest rates last updated on{" "}
          <span className="font-medium">{rateMeta.lastUpdated}</span> (source:
          FRED)
        </p>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8">Loading calculator...</div>}>
      <HomeContent />
    </Suspense>
  );
}
