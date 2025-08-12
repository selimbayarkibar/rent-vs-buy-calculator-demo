"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import NavBar from "@/components/NavBar";
import ActionButtons from "@/components/ActionButtons";
import defaultSellBusinessValues from "@/data/sellBusiness/defaultSellBusinessValues.json";
import calculateSellBusinessResults from "@/lib/sellBusiness/sellBusinessCalculations";

import SellBusinessForm from "@/components/SellBusiness/SellBusinessForm";
import SellBusinessResults from "@/components/SellBusiness/SellBusinessResults";
import ComparisonBarChart from "@/components/SellChart/ComparisonBarChart";

function SellBusinessContent() {
  const searchParams = useSearchParams();
  const [formValues, setFormValues] = useState(null);

  useEffect(() => {
    const values = { ...defaultSellBusinessValues };

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

  const results = calculateSellBusinessResults(formValues);

  return (
    <main className="px-4 pb-8 min-h-screen pt-18 sm:pt-16">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-6 text-left">
        Sell Your Business Calculator
      </h1>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Form */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <SellBusinessForm values={formValues} onChange={setFormValues} />
          <div className="border-y border-gray-200 mt-6 pb-6 md:border-b-0">
            <SellBusinessResults results={results} />
          </div>
        </div>

        {/* Output Section */}
        <div className="w-full h-full lg:w-1/2 flex flex-col text-md border-2 md:ml-6 px-4 py-6">
          {/* Placeholder */}
          <div className="text-center p-4">
            <ComparisonBarChart
              results={{
                label: "Business Sale",
                withV: results.moneyLeftAfterV,
                withoutV: results.moneyLeftBeforeV,
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row items-center border-t justify-center py-6 border-gray-200 gap-4 mt-8">
            <ActionButtons
              formValues={formValues}
              setFormValues={setFormValues}
              resetDefaults={defaultSellBusinessValues}
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

export default function SellBusinessPage() {
  return (
    <>
      <NavBar />
      <Suspense
        fallback={<div className="p-8 pt-24">Loading calculator...</div>}
      >
        <SellBusinessContent />
      </Suspense>
    </>
  );
}
