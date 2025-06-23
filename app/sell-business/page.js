"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import defaultSellBusinessValues from "@/data/defaultSellBusinessValues.json";
import calculateSellBusinessResults from "@/lib/sellBusiness/sellBusinessCalculations";
import SellBusinessForm from "@/components/SellBusiness/SellBusinessForm";
import SellBusinessResults from "@/components/SellBusiness/SellBusinessResults";
import { handleShare } from "@/lib/shareUtils";
import ComparisonBarChart from "@/components/SellChart/ComparisonBarChart";

function SellBusinessContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
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
    <main className="p-8 min-h-screen my-12 ">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-6 text-left">
        Sell Your Business Calculator
      </h1>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row">
        {/* Form */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <SellBusinessForm values={formValues} onChange={setFormValues} />
          <SellBusinessResults results={results} />
        </div>

        {/* Output Section */}
        <div className="w-full lg:w-1/2 flex flex-col text-md border-2 lg:ml-6 px-4 py-6">
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
          <div className="flex flex-col sm:flex-row items-center justify-center py-6 border-t border-gray-200 gap-4 mt-8">
            <Button
              onClick={() => handleShare(formValues, pathname)}
              className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
            >
              Share Custom Values
            </Button>
            <Button
              onClick={() => {
                setFormValues({
                  ...defaultSellBusinessValues,
                });
                router.push("/sell-business");
              }}
              variant="outline"
              className="hover:cursor-pointer"
            >
              Reset to Defaults
            </Button>
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
