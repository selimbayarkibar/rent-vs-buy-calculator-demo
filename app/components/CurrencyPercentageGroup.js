"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { CurrencyInput, PercentageInput } from "@/components/ui/formattedInput";
import { createPercentageValidationSchema } from "@/lib/validationSchemas";

export default function CurrencyPercentageGroup({
  label,
  currencyId,
  percentageId,
  currencyValue,
  percentageValue,
  onCurrencyChange,
  onPercentageChange,
  parentValue,
  parentField = "parent",
  parentLabel = "Parent value",
}) {
  const [editingField, setEditingField] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const schema = createPercentageValidationSchema({
      parentField,
      childField: currencyId,
      label,
      parentLabel,
    });

    const result = schema.safeParse({
      [parentField]: Number(parentValue),
      [currencyId]: Number(currencyValue),
    });

    if (!result.success) {
      const msg = result.error.flatten().fieldErrors?.[currencyId]?.[0];
      setError(msg || "");
    } else {
      setError("");
    }
  }, [currencyValue, parentValue, currencyId, label, parentField, parentLabel]);

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
            className={`peer w-full border py-2 px-4 text-md mt-4 transition-all duration-150 ${
              error
                ? "border-red-500 bg-red-200 focus:ring-2 focus:ring-red-500"
                : "border-gray-500 bg-white focus:border-blue-600 focus:bg-blue-50 focus:ring-2 focus:ring-blue-500"
            }`}
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
            className={`peer w-full border py-2 px-4 text-md mt-4 transition-all duration-150 ${
              error
                ? "border-red-500 bg-red-200 focus:ring-2 focus:ring-red-500"
                : "border-gray-500 bg-white focus:border-blue-600 focus:bg-blue-50 focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </div>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
