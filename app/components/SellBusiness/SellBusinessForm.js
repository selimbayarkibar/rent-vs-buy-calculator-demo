"use client";
import { Label } from "@/components/ui/label";
import { CurrencyInput, PercentageInput } from "@/components/ui/formattedInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SellBusinessForm({ values, onChange }) {
  const handleChange = (field, value) => {
    const updated = { ...values, [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6 bg-beige">
      <div className="border p-4 rounded-lg">
        {/* Business Section */}
        <h2 className="text-lg font-semibold mb-4">🏢 Business Info</h2>

        {/* Business State */}
        <div className="mt-4">
          <Label htmlFor="businessState" className="mb-1 block">
            Business State
          </Label>
          <Select
            value={String(values.businessState ?? "")}
            onValueChange={(value) => handleChange("businessState", value)}
          >
            <SelectTrigger id="businessState" className="w-full">
              <SelectValue placeholder="Select Business State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CA">California (CA)</SelectItem>
              <SelectItem value="NY">New York (NY)</SelectItem>
              <SelectItem value="TX">Texas (TX)</SelectItem>
              <SelectItem value="FL">Florida (FL)</SelectItem>
              <SelectItem value="IL">Illinois (IL)</SelectItem>
              <SelectItem value="WA">Washington (WA)</SelectItem>
              <SelectItem value="CO">Colorado (CO)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Percent of Ownership */}
        <div className="mt-4 relative">
          <Label htmlFor="percentOfOwnership">Percent of Ownership </Label>
          <PercentageInput
            value={values.percentOfOwnership}
            onChange={(v) => handleChange("percentOfOwnership", v)}
          />
        </div>

        {/* Estimated Purchase Price */}
        <div className="relative mt-4">
          <Label htmlFor="purchasePrice">
            Estimated Purchase Price (Total Cost Basis)
          </Label>
          <CurrencyInput
            value={values.purchasePrice}
            onChange={(v) => handleChange("purchasePrice", v)}
          />
        </div>

        {/* Estimated Sales Price */}
        <div className="relative mt-4">
          <Label htmlFor="salesPrice">
            Estimated Sales Price (Total Business Value)
          </Label>
          <CurrencyInput
            value={values.salesPrice}
            onChange={(v) => handleChange("salesPrice", v)}
          />
        </div>

        {/* Filing Status */}
        <div className="mt-4">
          <Label htmlFor="filingStatus" className="mb-1 block">
            Filing Status
          </Label>
          <Select
            value={String(values.filingStatus ?? "")}
            onValueChange={(value) => handleChange("filingStatus", value)}
          >
            <SelectTrigger id="filingStatus" className="w-full">
              <SelectValue placeholder="Select filing status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="joint">Joint</SelectItem>
              <SelectItem value="single">Single</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Owned */}
        <div className="mt-4">
          <Label htmlFor="owned" className="mb-1 block">
            Shares owned more than one year?
          </Label>
          <Select
            value={String(values.owned ?? "")}
            onValueChange={(value) => handleChange("owned", value)}
          >
            <SelectTrigger id="owned" className="w-full">
              <SelectValue placeholder="Select a term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
