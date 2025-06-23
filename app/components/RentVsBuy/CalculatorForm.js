import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  CurrencyInput,
  PercentageInput,
  SecurityDepositInput,
} from "@/components/ui/formattedInput";
import CurrencyPercentageGroup from "@/components/CurrencyPercentageGroup";

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
import { useState } from "react";

export function CalculatorForm({ values, onChange }) {
  const [openRentOptions, setOpenRentOptions] = useState(false);
  const [openBuyOptions, setOpenBuyOptions] = useState(false);
  const [openAdditionalOptions, setOpenAdditionalOptions] = useState(false);
  const [editingField, setEditingField] = useState(null);

  function handleChange(field, value) {
    const stringFields = ["loanTerm", "taxFilingStatus"];
    const percentageFields = [
      "brokerFee",
      "rentIncrease",
      "downPaymentPercentage",
      "interestRate",
      "closingCosts",
      "propertyTaxRate",
      "homeownersInsurancePercentage",
      "pmi",
      "maintenancePercentage",
      "sellingCosts",
      "homeAppreciation",
      "rateOfReturn",
      "marginalTaxRate",
      "capitalGainsTaxRate",
      "generalInflationRate",
    ];
    if (percentageFields.includes(field) && Number(value) > 100) return;

    const truncateToTwoDecimals = (val, field = "") => {
      const num = Number(val);
      if (isNaN(num)) return "";
      const factor = field === "interestRate" ? 1000 : 100;
      return Math.floor(num * factor) / factor;
    };

    onChange((prev) => {
      const numericValue = truncateToTwoDecimals(Number(value) || 0, field);
      const currentPrice =
        field === "purchasePrice" ? numericValue : prev.purchasePrice;

      let updated = {
        ...prev,
        [field]: stringFields.includes(field) ? value : numericValue,
      };

      if (field === "downPayment") {
        if (editingField !== "downPaymentPercentage") {
          updated.downPaymentPercentage =
            currentPrice > 0 ? (numericValue / currentPrice) * 100 : 0;
        }
      } else if (field === "downPaymentPercentage") {
        if (editingField !== "downPayment") {
          updated.downPayment =
            currentPrice > 0 ? (numericValue / 100) * currentPrice : 0;
        }
      }

      if (field === "homeownersInsurance") {
        updated.homeownersInsurancePercentage = currentPrice
          ? (numericValue / currentPrice) * 100
          : 0;
      } else if (field === "homeownersInsurancePercentage") {
        updated.homeownersInsurance = currentPrice
          ? (numericValue / 100) * currentPrice
          : 0;
      }

      if (field === "maintenance") {
        updated.maintenancePercentage = currentPrice
          ? (numericValue / currentPrice) * 100
          : 0;
      } else if (field === "maintenancePercentage") {
        updated.maintenance = currentPrice
          ? (numericValue / 100) * currentPrice
          : 0;
      }

      if (field === "purchasePrice") {
        if (prev.downPaymentPercentage !== "") {
          updated.downPayment =
            (prev.downPaymentPercentage / 100) * numericValue;
        }
        if (prev.homeownersInsurancePercentage !== "") {
          updated.homeownersInsurance =
            (prev.homeownersInsurancePercentage / 100) * numericValue;
        }
        if (prev.maintenancePercentage !== "") {
          updated.maintenance =
            (prev.maintenancePercentage / 100) * numericValue;
        }
      }

      return updated;
    });
  }

  return (
    <div className="space-y-6 bg-[#ede8db]">
      <div className="border p-4 rounded-lg">
        {/* Renting Section */}
        <h2 className="text-lg font-semibold mb-4">Renting</h2>

        {/* Monthly Rent */}
        <div className="relative">
          <Label htmlFor="monthlyRent">Rent (monthly) </Label>
          <CurrencyInput
            value={values.monthlyRent}
            onChange={(v) => handleChange("monthlyRent", v)}
          />
        </div>

        {/* Security Deposit */}
        <div className="mt-4 relative">
          <Label htmlFor="securityDeposit">Security Deposit</Label>
          <SecurityDepositInput
            value={values.securityDeposit}
            onChange={(v) => handleChange("securityDeposit", v)}
          />
        </div>

        {/* Show Options Button */}
        <Collapsible open={openRentOptions} onOpenChange={setOpenRentOptions}>
          <CollapsibleTrigger asChild>
            <Button
              variant="link"
              className="mt-4 text-blue-700 font-semibold hover:cursor-pointer"
            >
              {openRentOptions ? "HIDE OPTIONS ▲" : "SHOW OPTIONS ▼"}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-4 mt-4">
            {/* Advanced Fields */}
            <div className="relative">
              {/* Renters Insurance */}
              <Label htmlFor="rentersInsurance">
                Renter&apos;s Insurance (monthly)
              </Label>
              <CurrencyInput
                value={values.rentersInsurance}
                onChange={(v) => handleChange("rentersInsurance", v)}
              />
            </div>
            <div className="relative">
              {/* Broker Fee */}
              <Label htmlFor="brokerFee">Broker fee</Label>
              <PercentageInput
                value={values.brokerFee}
                onChange={(v) => handleChange("brokerFee", v)}
              />
            </div>
            <div className="relative">
              {/* Rent Increase */}
              <Label htmlFor="rentIncrease">Rent increase (yearly)</Label>
              <PercentageInput
                value={values.rentIncrease}
                onChange={(v) => handleChange("rentIncrease", v)}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
        {/* Buying Section */}
        <h2 className="text-lg font-semibold my-4">Buying</h2>
        {/* Purchase Price */}
        <div className="relative">
          <Label htmlFor="purchasePrice">Purchase price </Label>
          <CurrencyInput
            value={values.purchasePrice}
            onChange={(v) => handleChange("purchasePrice", v)}
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
            onCurrencyChange={(v) => handleChange("downPayment", v)}
            onPercentageChange={(v) => handleChange("downPaymentPercentage", v)}
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

        {/* Interest Rate */}
        <div className="mt-4 relative">
          <Label htmlFor="interestRate">Interest Rate </Label>
          <PercentageInput
            value={values.interestRate}
            onChange={(v) => handleChange("interestRate", v)}
            decimalScale={3}
          />
        </div>

        {/* Show Options Button */}
        <Collapsible open={openBuyOptions} onOpenChange={setOpenBuyOptions}>
          <CollapsibleTrigger asChild>
            <Button
              variant="link"
              className="mt-4 text-blue-700 font-semibold hover:cursor-pointer"
            >
              {openBuyOptions ? "HIDE OPTIONS ▲" : "SHOW OPTIONS ▼"}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-4 mt-4">
            {/* Advanced Fields */}
            <div className="relative">
              {/* Closing Costs */}
              <Label htmlFor="closingCosts">Closing costs</Label>
              <PercentageInput
                value={values.closingCosts}
                onChange={(v) => handleChange("closingCosts", v)}
              />
            </div>
            <div className="relative">
              {/* Property Tax Rate */}
              <Label htmlFor="propertyTaxRate">Property Tax Rate</Label>
              <PercentageInput
                value={values.propertyTaxRate}
                onChange={(v) => handleChange("propertyTaxRate", v)}
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
                onCurrencyChange={(v) => handleChange("homeownersInsurance", v)}
                onPercentageChange={(v) =>
                  handleChange("homeownersInsurancePercentage", v)
                }
                purchasePrice={values.purchasePrice}
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
            <div className="relative">
              {/* Private Mortgage Insurance (PMI) */}
              <Label htmlFor="pmi">Private Mortgage Insurance (PMI)</Label>
              <PercentageInput
                value={values.pmi}
                onChange={(v) => handleChange("pmi", v)}
              />
            </div>
            <div className="relative">
              {/* Additional Utility Costs */}
              <Label htmlFor="utilityCosts">
                Additional Utility Costs (monthly)
              </Label>
              <CurrencyInput
                value={values.utilityCosts}
                onChange={(v) => handleChange("utilityCosts", v)}
              />
            </div>
            {/* Home Repairs and Maintenance */}
            <div>
              <CurrencyPercentageGroup
                label="Home Repairs and Maintenance (yearly)"
                currencyId="maintenance"
                percentageId="maintenancePercentage"
                currencyValue={values.maintenance}
                percentageValue={values.maintenancePercentage}
                onCurrencyChange={(v) => handleChange("maintenance", v)}
                onPercentageChange={(v) =>
                  handleChange("maintenancePercentage", v)
                }
                purchasePrice={values.purchasePrice}
              />
            </div>

            <div className="relative">
              {/* Selling Costs */}
              <Label htmlFor="sellingCosts">Selling Costs</Label>
              <PercentageInput
                value={values.sellingCosts}
                onChange={(v) => handleChange("sellingCosts", v)}
              />
            </div>
            <div className="relative">
              {/* Home Appreciation */}
              <Label htmlFor="homeAppreciation">
                Home Appreciation (yearly)
              </Label>
              <PercentageInput
                value={values.homeAppreciation}
                onChange={(v) => handleChange("homeAppreciation", v)}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
        {/* Additional Info */}
        <h2 className="text-lg font-semibold my-4">Additional Info</h2>

        {/* Tax Filing Status */}
        <div>
          <Label htmlFor="taxFilingStatus">Tax Filing Status</Label>
          <Select
            value={String(values.taxFilingStatus ?? "")}
            onValueChange={(value) => handleChange("taxFilingStatus", value)}
          >
            <SelectTrigger id="taxFilingStatus" className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="joint">Joint</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Annual Rate of Return */}
        <div className="mt-4 relative">
          <Label htmlFor="rateOfReturn">Annual Rate of Return</Label>
          <PercentageInput
            value={values.rateOfReturn}
            onChange={(v) => handleChange("rateOfReturn", v)}
          />
        </div>

        {/* Show Options Button */}
        <Collapsible
          open={openAdditionalOptions}
          onOpenChange={setOpenAdditionalOptions}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="link"
              className="mt-4 text-blue-700 font-semibold hover:cursor-pointer"
            >
              {openAdditionalOptions ? "HIDE OPTIONS ▲" : "SHOW OPTIONS ▼"}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-4 mt-4">
            {/* Advanced Fields */}
            <div className="relative">
              {/* Marginal Tax Rate */}
              <Label htmlFor="marginalTaxRate">Marginal Tax Rate</Label>
              <PercentageInput
                value={values.marginalTaxRate}
                onChange={(v) => handleChange("marginalTaxRate", v)}
              />
            </div>
            <div className="relative">
              {/* Capital Gains Tax Rate */}
              <Label htmlFor="capitalGainsTaxRate">
                Capital Gains Tax Rate
              </Label>
              <PercentageInput
                value={values.capitalGainsTaxRate}
                onChange={(v) => handleChange("capitalGainsTaxRate", v)}
              />
            </div>
            <div className="relative">
              {/* General Inflation Rate */}
              <Label htmlFor="generalInflation Rate">
                General Inflation Rate
              </Label>
              <PercentageInput
                value={values.generalInflationRate}
                onChange={(v) => handleChange("generalInflationRate", v)}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
