import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { MonthPicker } from "@/components/ui/monthpicker";
import { format } from "date-fns";

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
      className="peer w-full border border-gray-500 py-2 px-4 text-md bg-white mt-4 focus:border-blue-600 focus:bg-blue-50 focus:ring-2 focus:ring-blue-500"
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
        className="peer w-full border border-gray-500 py-2 pl-4 text-md bg-white mt-4 focus:border-blue-600 focus:bg-blue-50 focus:ring-2 focus:ring-blue-500"
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
        className="peer w-full border border-gray-500 py-2 px-4 text-md bg-white mt-4 focus:border-blue-600 focus:bg-blue-50 focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  );
}

export function CalendarInput({ id, value, onChange }) {
  const parseStartDate = (startDateStr) => {
    if (!startDateStr) return undefined;
    const [year, month] = startDateStr.split("-").map(Number);
    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month - 1); // JS months are 0-based
    date.setDate(1);
    return date;
  };

  const [selectedMonth, setSelectedMonth] = useState(parseStartDate(value));

  useEffect(() => {
    setSelectedMonth(parseStartDate(value));
  }, [value]);

  const handleMonthSelect = (date) => {
    setSelectedMonth(date);
    const formatted = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;
    onChange(formatted);
  };

  return (
    <div className="mt-4 w-full">
      <Popover>
        <PopoverTrigger asChild>
          <button className="mt-4 w-full border border-gray-500 py-2 px-4 text-md bg-white flex items-center justify-between">
            <span className="text-gray-800">
              {selectedMonth ? format(selectedMonth, "MM/yyyy") : "MM/yyyy"}
            </span>
            <CalendarIcon className="h-4 w-4 text-black hover:cursor-pointer" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <MonthPicker
            selectedMonth={selectedMonth}
            onMonthSelect={handleMonthSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function ConditionalInput({ condition, children }) {
  const [shouldRender, setShouldRender] = useState(condition);

  useEffect(() => {
    if (condition) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [condition]);

  return (
    <div
      className={cn(
        "transition-all duration-200 ease-in-out transform",
        condition
          ? "opacity-100 scale-100 max-h-[200px]"
          : "opacity-0 scale-95 max-h-0 overflow-hidden"
      )}
    >
      {shouldRender && children}
    </div>
  );
}

export function NumberInput({
  value,
  onChange,
  placeholder = "0",
  decimalScale = 0,
  allowNegative = false,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const displayValue = isFocused && value === 0 ? "" : value;

  return (
    <div className="w-full">
      <NumericFormat
        value={displayValue}
        decimalScale={decimalScale}
        allowNegative={allowNegative}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          const raw = e.target.value?.replace(/[^0-9.]/g, "");
          if (!raw || isNaN(Number(raw))) onChange(0);
        }}
        onValueChange={({ floatValue }) => onChange(floatValue ?? "")}
        className="peer w-full border border-gray-500 py-2 px-4 text-md bg-white mt-4 focus:border-blue-600 focus:bg-blue-50 focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  );
}
