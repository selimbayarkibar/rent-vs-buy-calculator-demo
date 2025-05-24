"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { CalculatorForm } from "@/components/CalculatorForm";
import RentVsBuyGraph from "@/components/ResultChart";
import { Button } from "@/components/ui/button";
import ResultsTable from "@/components/ResultsTable";

const DEFAULT_VALUES = {
  monthlyRent: 2000,
  securityDeposit: 1,
  rentersInsurance: 12,
  brokerFee: 0,
  rentIncrease: 3,
  purchasePrice: 415000,
  downPayment: 37350,
  downPaymentPercentage: 9,
  loanTerm: "30",
  interestRate: 7.068,
  closingCosts: 6,
  propertyTaxRate: 1.5,
  homeownersInsurance: 2666.88,
  homeownersInsurancePercentage: 0.64,
  hoaFees: 0,
  pmi: 0.98,
  utilityCosts: 100,
  maintenance: 6225,
  maintenancePercentage: 1.5,
  sellingCosts: 6,
  homeAppreciation: 4.5,
  taxFilingStatus: "individual",
  rateOfReturn: 6,
  marginalTaxRate: 22,
  capitalGainsTaxRate: 15,
  generalInflationRate: 3,
};

export default function Home() {
  const searchParams = useSearchParams();
  const [formValues, setFormValues] = useState(DEFAULT_VALUES);
  const [activeYear, setActiveYear] = useState(3);
  const [graphData, setGraphData] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const values = { ...DEFAULT_VALUES };
    for (const [key, value] of searchParams.entries()) {
      values[key] = isNaN(value) ? value : parseFloat(value);
    }
    setFormValues(values);
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

  const yearData = graphData?.find((d) => d.year === activeYear);

  return (
    <main className="flex flex-col lg:flex-row p-4 lg:p-8 min-h-screen bg-gray-50">
      {/* Calculator on top (mobile), left (desktop) */}
      <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
        <CalculatorForm values={formValues} onChange={setFormValues} />
      </div>

      {/* Graph + Table on bottom (mobile), right (desktop) */}
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
              setFormValues(DEFAULT_VALUES);
              router.push("/");
            }}
            variant="outline"
            className="hover:cursor-pointer"
          >
            Reset to Default Values
          </Button>
        </div>
      </div>
    </main>
  );
}
