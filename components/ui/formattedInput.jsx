import { useState } from "react";
import { NumericFormat } from "react-number-format";

export function CurrencyInput({
  value,
  onChange,
  placeholder = "$0",
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const displayValue = isFocused && value === 0 ? "" : value;

  return (
    <NumericFormat
      value={displayValue}
      thousandSeparator=","
      decimalScale={2}
      allowNegative={false}
      prefix="$"
      placeholder={placeholder}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        setIsFocused(false);
        const raw = e.target.value?.replace(/[^0-9.]/g, "");
        if (!raw || isNaN(Number(raw))) onChange(0);
      }}
      onValueChange={({ floatValue }) => onChange(floatValue ?? "")}
      className="peer w-full border border-gray-300 p-2 text-md bg-white mt-4"
      {...props}
    />
  );
}

export function PercentageInput({
  value,
  onChange,
  placeholder = "0%",
  decimalScale = 2,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const displayValue = isFocused && value === 0 ? "" : value;

  return (
    <div className="w-full">
      <NumericFormat
        value={displayValue}
        thousandSeparator=","
        decimalScale={decimalScale}
        allowNegative={false}
        suffix="%"
        placeholder={placeholder}
        isAllowed={({ floatValue }) =>
          floatValue === undefined || floatValue <= 100
        }
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          const raw = e.target.value?.replace(/[^0-9.]/g, "");
          if (!raw || isNaN(Number(raw))) onChange(0);
        }}
        onValueChange={({ floatValue }) => onChange(floatValue ?? "")}
        className="peer w-full border border-gray-300 p-2 text-md bg-white mt-4"
        {...props}
      />
    </div>
  );
}

export function SecurityDepositInput({
  value,
  onChange,
  placeholder = "0 month's rent",
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const displayValue = isFocused && value === 0 ? "" : value;

  return (
    <div className="w-full">
      <NumericFormat
        value={displayValue}
        allowNegative={false}
        decimalScale={0}
        suffix=" month's rent"
        placeholder={placeholder}
        isAllowed={({ floatValue }) =>
          floatValue === undefined || (floatValue >= 0 && floatValue <= 12)
        }
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          const raw = e.target.value?.replace(/[^0-9.]/g, "");
          if (!raw || isNaN(Number(raw))) onChange(0);
        }}
        onValueChange={({ floatValue }) => onChange(floatValue ?? "")}
        className="peer w-full border border-gray-300 p-2 text-md bg-white mt-4"
        {...props}
      />
    </div>
  );
}
