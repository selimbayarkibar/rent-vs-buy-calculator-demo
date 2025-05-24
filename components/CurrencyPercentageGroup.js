// components/CurrencyPercentageGroup.js
"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { CurrencyInput, PercentageInput } from "@/components/ui/formattedInput";

export default function CurrencyPercentageGroup({
  label,
  currencyId,
  percentageId,
  currencyValue,
  percentageValue,
  onCurrencyChange,
  onPercentageChange,
}) {
  const [editingField, setEditingField] = useState(null);

  return (
    <div className="mt-4">
      <Label htmlFor={currencyId}>{label}</Label>
      <div className="flex gap-2">
        <div className="w-3/4">
          <CurrencyInput
            id={currencyId}
            value={currencyValue}
            onFocus={() => setEditingField("currency")}
            onBlur={() => setEditingField(null)}
            onChange={(v) => {
              if (editingField !== "percentage") {
                onCurrencyChange(v);
              }
            }}
          />
        </div>
        <div className="w-1/4">
          <PercentageInput
            id={percentageId}
            value={percentageValue}
            onFocus={() => setEditingField("percentage")}
            onBlur={() => setEditingField(null)}
            onChange={(v) => {
              if (editingField !== "currency") {
                onPercentageChange(v);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
