"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import NavBar from "@/components/NavBar";
import ValuationForm from "@/components/Valuation/ValuationForm";
import ValuationResults from "@/components/Valuation/ValuationResults";
import ActionButtons from "@/components/ActionButtons";
import calculateValuationResults from "@/lib/valuation/valuationCalculations";
import defaultValues from "@/data/valuation/defaultValuationValues.json";

function ValuationContent() {
  const searchParams = useSearchParams();
  const [formValues, setFormValues] = useState({ ...defaultValues });
  const [showResults, setShowResults] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const values = { ...defaultValues }; // or defaultSellBusinessValues for sell business page

    for (const [key, value] of searchParams.entries()) {
      // Handle boolean values first
      if (value === "true") {
        values[key] = true;
      } else if (value === "false") {
        values[key] = false;
      } else if (!isNaN(value) && value !== "") {
        // Handle numeric values
        values[key] = parseFloat(value);
      } else {
        // Handle string values
        values[key] = value;
      }
    }

    setFormValues(values);
  }, [searchParams]);

  const handleFormChange = (newValues) => {
    // Ensure we're creating a new object reference
    setFormValues({ ...newValues });
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setFormValues({ ...defaultValues });
    setShowResults(false);
    setResetKey((prev) => prev + 1);
  };

  const results = showResults ? calculateValuationResults(formValues) : null;

  return (
    <main className="px-4 pb-8 min-h-screen pt-24 sm:pt-20">
      <h1 className="text-2xl font-semibold mb-6 text-left">
        Business Valuation Calculator
      </h1>

      <div className="flex flex-col md:flex-row">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <ValuationForm
            key={resetKey}
            values={formValues}
            onChange={handleFormChange}
            onCalculate={handleCalculate}
          />
        </div>

        {/* Results Section */}
        <div className="w-full h-full lg:w-1/2 flex flex-col text-md border-2 md:ml-6 px-4 py-6">
          {showResults ? (
            <ValuationResults
              results={results}
              businessName={formValues.businessName}
            />
          ) : (
            <div className="text-gray-600 text-center">
              Enter your business details and click
              <strong> Calculate Valuation</strong> to see results here.
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row items-center border-t justify-center pt-6 border-gray-200 gap-4 mt-6">
            <ActionButtons
              formValues={formValues}
              setFormValues={setFormValues}
              resetDefaults={{ ...defaultValues }}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ValuationPage() {
  return (
    <>
      <NavBar />
      <Suspense
        fallback={<div className="p-8 pt-24">Loading calculator...</div>}
      >
        <ValuationContent />
      </Suspense>
    </>
  );
}
