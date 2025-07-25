"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MortgageForm from "@/components/Mortgage/MortgageForm";
import MortgageChart from "@/components/Mortgage/MortgageChart";
import MortgageTable from "@/components/Mortgage/MortgageTable";
import NavBar from "@/components/NavBar";
import defaultMortgageValues from "@/data/mortgage/defaultMortgageValues.json";
import { getCalculatedValues } from "@/lib/mortgage/mortgageCalculations";
import ActionButtons from "@/components/ActionButtons";

const fallbackRates = {
  rates: {
    "30yr_fixed": 7.068,
    "15yr_fixed": 6.03,
  },
  lastUpdated: "N/A",
};

function MortgageContent() {
  const searchParams = useSearchParams();
  const [rateMeta, setRateMeta] = useState(fallbackRates);
  const [formValues, setFormValues] = useState(null);
  const [activeView, setActiveView] = useState("chart");

  useEffect(() => {
    async function loadDefaults() {
      try {
        const res = await fetch("/api/rates");
        const rateData = await res.json();

        const now = new Date();
        const defaultStartDate = `${now.getFullYear()}-${(now.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;

        const base = {
          ...defaultMortgageValues,
          startDate: defaultStartDate,
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
          ...defaultMortgageValues,
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

  const calculatedValues = getCalculatedValues(formValues);

  return (
    <main className="p-4 lg:p-8 min-h-screen my-12 ">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-6 text-left">
        Mortgage Calculator
      </h1>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row">
        {/* Form */}
        <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
          <MortgageForm values={formValues} onChange={setFormValues} />
        </div>

        {/* Output Section */}
        <div className="w-full lg:w-2/3 flex flex-col text-gray-600 text-md border-2 lg:ml-6 px-4 py-6">
          {/* View Toggle Buttons */}
          <div className="flex justify-left gap-8 mb-6 border-gray-200">
            <button
              onClick={() => setActiveView("chart")}
              className={`pb-2 font-bold transition-colors border-b-2 hover:cursor-pointer ${
                activeView === "chart"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-blue-400 hover:border-blue-400"
              }`}
            >
              Loan Estimate
            </button>
            <button
              onClick={() => setActiveView("table")}
              className={`pb-2 font-bold transition-colors border-b-2 hover:cursor-pointer ${
                activeView === "table"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-blue-400 hover:border-blue-400"
              }`}
            >
              Amortization Schedule
            </button>
          </div>

          {/* Placeholder */}
          <div className="text-center text-gray-500">
            {activeView === "chart" ? (
              <MortgageChart
                values={formValues}
                calculations={calculatedValues}
              />
            ) : (
              <MortgageTable values={formValues} />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center py-6 border-t border-gray-200 gap-4 mt-8">
            <ActionButtons
              formValues={formValues}
              setFormValues={setFormValues}
              resetDefaults={{
                ...defaultMortgageValues,
                interestRate: rateMeta.rates["30yr_fixed"],
              }}
            />
          </div>

          {/* Footnote */}
          <p className="text-sm text-center text-gray-700 mt-2">
            * Interest rates last updated on{" "}
            <span className="font-medium">{rateMeta.lastUpdated} UTC</span>{" "}
            (source: FRED)
          </p>
        </div>
      </div>
    </main>
  );
}

export default function MortgagePage() {
  return (
    <>
      <NavBar />
      <Suspense
        fallback={<div className="p-8 pt-24">Loading calculator...</div>}
      >
        <MortgageContent />
      </Suspense>
    </>
  );
}
