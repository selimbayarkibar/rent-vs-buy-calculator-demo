"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { CalculatorForm } from "@/components/RentVsBuy/CalculatorForm";
import RentVsBuyGraph from "@/components/RentVsBuy/ResultChart";
import { Button } from "@/components/ui/button";
import ResultsTable from "@/components/RentVsBuy/ResultsTable";
import defaultValues from "@/data/defaultValues.json";
import NavBar from "@/components/NavBar";
import { handleShare } from "./lib/shareUtils";

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

  if (!formValues) {
    return (
      <div className="flex justify-center items-center h-screen pt-16">
        Loading calculator...
      </div>
    );
  }

  const yearData = graphData.find((d) => d.year === activeYear) || {};

  return (
    <main className="p-4 lg:p-8 min-h-screen mt-12">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-6 text-left">
        Rent vs Buy Calculator
      </h1>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row">
        {/* Calculator Form */}
        <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
          <CalculatorForm values={formValues} onChange={setFormValues} />
        </div>

        {/* Graph + Table */}
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
              onClick={() => handleShare(formValues, pathname)}
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
            <span className="font-medium">{rateMeta.lastUpdated} UTC</span>{" "}
            (source: FRED)
          </p>
        </div>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <>
      <NavBar />
      <Suspense
        fallback={<div className="p-8 pt-24">Loading calculator...</div>}
      >
        <HomeContent />
      </Suspense>
    </>
  );
}
