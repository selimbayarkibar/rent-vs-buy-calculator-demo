"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import NavBar from "@/components/NavBar";
import ActionButtons from "@/components/ActionButtons";
import defaultSellHouseValues from "@/data/sellHouse/defaultSellHouseValues.json";
import calculateSellHouseResults from "@/lib/sellHouse/sellHouseCalculations";

import SellHouseForm from "@/components/SellHouse/SellHouseForm";
import SellHouseResults from "@/components/SellHouse/SellHouseResults";
import ComparisonBarChart from "@/components/SellChart/ComparisonBarChart";

function SellHouseContent() {
  const searchParams = useSearchParams();
  const [formValues, setFormValues] = useState(null);

  useEffect(() => {
    const values = { ...defaultSellHouseValues };

    for (const [key, value] of searchParams.entries()) {
      values[key] = isNaN(value) ? value : parseFloat(value);
    }

    setFormValues(values);
  }, [searchParams]);

  if (!formValues) {
    return (
      <div className="flex justify-center items-center h-screen pt-16">
        Loading calculator...
      </div>
    );
  }

  const results = calculateSellHouseResults(formValues);

  return (
    <main className="px-4 pb-8 min-h-screen pt-18 sm:pt-16">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-6 text-left">
        Sell Your House Calculator
      </h1>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Form */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <SellHouseForm values={formValues} onChange={setFormValues} />
          <div className="border-y border-gray-200 mt-6 pb-6 md:border-b-0">
            <SellHouseResults results={results} />
          </div>
        </div>

        {/* Output Section */}
        <div className="w-full lg:w-1/2 flex flex-col text-md border-2 md:ml-6 px-4 py-6">
          {/* Placeholder */}
          <div className="text-center p-4">
            <ComparisonBarChart
              results={{
                label: "Home Sale",
                withV: results.moneyLeftAfterV,
                withoutV: results.moneyLeftBeforeV,
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center py-6 border-t border-gray-200 gap-4 mt-8">
            <ActionButtons
              formValues={formValues}
              setFormValues={setFormValues}
              resetDefaults={defaultSellHouseValues}
            />
          </div>

          {/* Footnote */}
          <p className="text-sm text-center text-gray-700 mt-2">
            This is not tax advice. If you have questions, please consult a tax
            professional to understand the implications for your unique
            situation
          </p>
        </div>
      </div>
    </main>
  );
}

export default function SellHousePage() {
  return (
    <>
      <NavBar />
      <Suspense
        fallback={<div className="p-8 pt-24">Loading calculator...</div>}
      >
        <SellHouseContent />
      </Suspense>
    </>
  );
}
