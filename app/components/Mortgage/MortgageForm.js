"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  CurrencyInput,
  PercentageInput,
  CalendarInput,
  ConditionalInput,
} from "@/components/ui/formattedInput";
import CurrencyPercentageGroup from "@/components/CurrencyPercentageGroup";
import { Button } from "@/components/ui/button";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MortgageForm({ values, onChange }) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (field, value) => {
    const updated = { ...values, [field]: value };

    if (field === "homePrice") {
      updated.downPayment = (value * values.downPaymentPercentage) / 100;
      updated.propertyTaxes = (value * values.propertyTaxesPercentage) / 100;
      updated.homeownersInsurance =
        (value * values.homeownersInsurancePercentage) / 100;
    }
    if (field === "downPayment") {
      updated.downPaymentPercentage = Math.round(
        (value / values.homePrice) * 100
      );
    }
    if (field === "downPaymentPercentage") {
      updated.downPayment = Math.round((values.homePrice * value) / 100);
    }
    // Automatically clear PMI when down payment is >= 20%
    if (
      (field === "downPayment" || field === "downPaymentPercentage") &&
      updated.downPaymentPercentage >= 20 &&
      updated.pmi > 0
    ) {
      updated.pmi = 0;
    }

    if (field === "propertyTaxes") {
      updated.propertyTaxesPercentage = (value / values.homePrice) * 100;
    }
    if (field === "propertyTaxesPercentage") {
      updated.propertyTaxes = (values.homePrice * value) / 100;
    }
    if (field === "homeownersInsurance") {
      updated.homeownersInsurancePercentage = (value / values.homePrice) * 100;
    }
    if (field === "homeownersInsurancePercentage") {
      updated.homeownersInsurance = (values.homePrice * value) / 100;
    }
    if (field === "pmi") {
      updated.pmiPercentage = (value / values.homePrice) * 1200;
    }
    if (field === "pmiPercentage") {
      updated.pmi = (values.homePrice * value) / 1200;
    }

    onChange(updated);
  };

  return (
    <div className="space-y-6 bg-[#ede8db]">
      <div className="border p-4 rounded-lg">
        {/* Loan Section */}
        <h2 className="text-lg font-semibold mb-4">Loan Info</h2>

        {/* Home Price */}
        <div className="relative">
          <Label htmlFor="homePrice">Home Price</Label>
          <CurrencyInput
            value={values.homePrice}
            onChange={(v) => handleChange("homePrice", v)}
          />
        </div>

        {/* Down Payment */}
        <div>
          <CurrencyPercentageGroup
            label="Down Payment"
            currencyId="downPayment"
            percentageId="downPaymentPercentage"
            currencyValue={values.downPayment}
            percentageValue={values.downPaymentPercentage}
            parentValue={values.homePrice}
            parentField="homePrice"
            parentLabel="Home Price"
            onCurrencyChange={(v) => handleChange("downPayment", v)}
            onPercentageChange={(v) => handleChange("downPaymentPercentage", v)}
          />
        </div>

        {/* Interest Rate */}
        <div className="mt-4 relative">
          <Label htmlFor="interestRate">Interest Rate </Label>
          <PercentageInput
            value={values.interestRate}
            onChange={(v) => handleChange("interestRate", v)}
            decimalScale={3}
          />
        </div>

        {/* Loan Term */}
        <div className="mt-4">
          <Label htmlFor="loanTerm" className="mb-1 block">
            Loan Term (years)
          </Label>
          <Select
            value={String(values.loanTerm ?? "")}
            onValueChange={(value) => handleChange("loanTerm", value)}
          >
            <SelectTrigger id="loanTerm" className="w-full">
              <SelectValue placeholder="Select a term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 years</SelectItem>
              <SelectItem value="15">15 years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Start Date */}
        <div className="mt-4">
          <Label htmlFor="startDate" className="mb-1 block">
            Start Date
          </Label>
          <div className="relative">
            <CalendarInput
              id="startDate"
              value={values.startDate}
              onChange={(v) => handleChange("startDate", v)}
            />
          </div>
        </div>

        {/* Show Options Button */}
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <CollapsibleTrigger asChild>
            <Button
              variant="link"
              className="mt-4 text-blue-700 font-semibold hover:cursor-pointer"
            >
              {showAdvanced ? "HIDE ADVANCED INFO ▲" : "SHOW ADVANCED INFO ▼"}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-4 mt-4">
            {/* Advanced Fields */}
            <div>
              {/* Property Taxes */}
              <CurrencyPercentageGroup
                label="Property Taxes (yearly)"
                currencyId="propertyTaxes"
                percentageId="propertyTaxesPercentage"
                currencyValue={values.propertyTaxes}
                percentageValue={values.propertyTaxesPercentage}
                parentValue={values.homePrice}
                parentField="homePrice"
                parentLabel="Home Price"
                onCurrencyChange={(v) => handleChange("propertyTaxes", v)}
                onPercentageChange={(v) =>
                  handleChange("propertyTaxesPercentage", v)
                }
              />
            </div>
            {/* Homeowners Insurance */}
            <div>
              <CurrencyPercentageGroup
                label="Homeowners Insurance (yearly)"
                currencyId="homeownersInsurance"
                percentageId="homeownersInsurancePercentage"
                currencyValue={values.homeownersInsurance}
                percentageValue={values.homeownersInsurancePercentage}
                parentValue={values.homePrice}
                parentField="homePrice"
                parentLabel="Home Price"
                onCurrencyChange={(v) => handleChange("homeownersInsurance", v)}
                onPercentageChange={(v) =>
                  handleChange("homeownersInsurancePercentage", v)
                }
              />
            </div>
            <div className="relative">
              {/* HOA fees */}
              <Label htmlFor="hoaFees">HOA fees (monthly)</Label>
              <CurrencyInput
                value={values.hoaFees}
                onChange={(v) => handleChange("hoaFees", v)}
              />
            </div>

            <div>
              <ConditionalInput condition={values.downPaymentPercentage < 20}>
                <CurrencyPercentageGroup
                  label="Private Mortgage Insurance (monthly)"
                  currencyId="pmi"
                  percentageId="pmiPercentage"
                  currencyValue={values.pmi}
                  percentageValue={values.pmiPercentage}
                  parentValue={values.homePrice}
                  parentField="homePrice"
                  parentLabel="Home Price"
                  onCurrencyChange={(v) => handleChange("pmi", v)}
                  onPercentageChange={(v) => handleChange("pmiPercentage", v)}
                />
              </ConditionalInput>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
