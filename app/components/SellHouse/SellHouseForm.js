"use client";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { CurrencyInput } from "@/components/ui/formattedInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SellHouseForm({ values, onChange }) {
  const handleChange = (field, value) => {
    const updated = { ...values, [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6 bg-[#ede8db]">
      <div className="border p-4 rounded-lg">
        {/* Home Section */}
        <h2 className="text-lg font-semibold mb-4">Home Info</h2>

        {/* Home State */}
        <div className="mt-4">
          <Label htmlFor="homeState" className="mb-1 block">
            Home State
          </Label>
          <Select
            value={String(values.homeState ?? "")}
            onValueChange={(value) => handleChange("homeState", value)}
          >
            <SelectTrigger id="homeState" className="w-full">
              <SelectValue placeholder="Select Home State" />
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

        {/* Original Purchase Price */}
        <div className="relative mt-4">
          <Label htmlFor="purchasePrice">Original Purchase Price</Label>
          <CurrencyInput
            value={values.purchasePrice}
            onChange={(v) => handleChange("purchasePrice", v)}
          />
        </div>

        {/* Home Improvements */}
        <div className="relative mt-4">
          <Label htmlFor="homeImprovements">Home Improvements</Label>
          <CurrencyInput
            value={values.homeImprovements}
            onChange={(v) => handleChange("homeImprovements", v)}
          />
        </div>

        {/* Estimated Sales Price */}
        <div className="relative mt-4">
          <Label htmlFor="salesPrice">Estimated Sales Price</Label>
          <CurrencyInput
            value={values.salesPrice}
            onChange={(v) => handleChange("salesPrice", v)}
          />
        </div>

        {/* Owned */}
        <div className="mt-4">
          <Label htmlFor="owned" className="mb-1 block">
            Owned more than one year?
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

        {/* Primary Residence */}
        <div className="mt-4">
          <Label htmlFor="primaryResidence" className="mb-1 block">
            Is this your primary residence?
          </Label>
          <Select
            value={String(values.primaryResidence ?? "")}
            onValueChange={(value) => handleChange("primaryResidence", value)}
          >
            <SelectTrigger id="primaryResidence" className="w-full">
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
