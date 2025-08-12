"use client";

import { Label } from "@/components/ui/label";
import { CurrencyInput, NumberInput } from "@/components/ui/formattedInput";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import industriesData from "@/data/valuation/industries.json";
import locationsData from "@/data/valuation/locations.json";
import financialMetricsData from "@/data/valuation/financialMetrics.json";

export default function ValuationForm({ values, onChange, onCalculate }) {
  const handleChange = (field, value) => {
    onChange({ ...values, [field]: value });
  };

  const selectedIndustryObj = industriesData.find(
    (item) => item.name === values.industry
  );

  const isFormComplete = () => {
    return (
      values.years !== null &&
      values.industry &&
      values.subIndustry &&
      values.locationLabel &&
      values.locationMultiplier !== null &&
      values.financialMetric &&
      values.metricValue !== null &&
      values.assets !== null &&
      values.liabilities !== null
    );
  };

  return (
    <div className="space-y-6 bg-beige">
      {/* --- BASIC INFO --- */}
      <div className="border p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">📋 Basic Information</h2>

        {/* Business Name */}
        <div className="mt-4">
          <Label htmlFor="businessName" className="mb-1 block">
            Business Name (Optional)
          </Label>
          <input
            id="businessName"
            type="text"
            placeholder="Your Business Name"
            className="peer w-full border border-gray-500 py-2 px-4 text-md mt-4 bg-white focus:border-blue-600 focus:bg-blue-50 focus:ring-2 focus:ring-blue-500"
            value={values.businessName || ""}
            onChange={(e) => handleChange("businessName", e.target.value)}
          />
        </div>

        {/* Years in Business */}
        <div className="mt-4">
          <Label htmlFor="years" className="mb-1 block">
            Years in Business
          </Label>
          <NumberInput
            value={values.years}
            onChange={(v) => handleChange("years", v)}
            placeholder="e.g., 5"
          />
        </div>

        {/* --- Industry --- */}
        <div className="mt-4">
          <Label htmlFor="industry" className="mb-1 block">
            Industry
          </Label>
          <Select
            value={values.industry || ""}
            onValueChange={(val) => {
              // Update both industry and reset subIndustry in a single call
              onChange({
                ...values,
                industry: val,
                subIndustry: "",
              });
            }}
          >
            <SelectTrigger id="industry" className="w-full">
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent>
              {industriesData.map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* --- Sub-Industry --- */}
        <div className="mt-4">
          <Label htmlFor="subIndustry" className="mb-1 block">
            Sub-Industry
          </Label>
          <Select
            value={values.subIndustry || ""}
            onValueChange={(val) => handleChange("subIndustry", val)}
            disabled={!values.industry}
          >
            <SelectTrigger id="subIndustry" className="w-full">
              <SelectValue placeholder="Select Sub-Industry" />
            </SelectTrigger>
            <SelectContent>
              {(selectedIndustryObj?.subIndustries || []).map((sub) => (
                <SelectItem key={sub} value={sub}>
                  {sub}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* --- Location --- */}
        <div className="mt-4">
          <Label htmlFor="location" className="mb-1 block">
            Location Type
          </Label>
          <Select
            value={values.locationLabel || ""}
            onValueChange={(value) => {
              const selected = locationsData.find((l) => l.label === value);
              if (selected) {
                // Update both values in a single call
                onChange({
                  ...values,
                  locationLabel: selected.label,
                  locationMultiplier: selected.multiplier,
                });
              }
            }}
          >
            <SelectTrigger id="locationLabel" className="w-full">
              <SelectValue placeholder="Select Location Type" />
            </SelectTrigger>
            <SelectContent>
              {locationsData.map((loc) => (
                <SelectItem
                  key={loc.label}
                  value={loc.label}
                  className="flex flex-col items-start py-3"
                >
                  <span className="font-medium">{loc.label}</span>
                  <span className="text-xs text-gray-500 mt-1">
                    {loc.description}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clients/Jobs */}
        <div className="mt-4">
          <Label htmlFor="clients" className="mb-1 block">
            Number of Clients/Jobs per Year
          </Label>
          <NumberInput
            value={values.clientsPerYear}
            onChange={(v) => handleChange("clientsPerYear", v)}
            placeholder="e.g., 100"
          />
        </div>
      </div>

      {/* --- FINANCIAL INFO --- */}
      <div className="border px-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">💲 Financial Information</h2>

        {/* Metric */}
        <div className="mt-4">
          <Label htmlFor="financialMetric" className="mb-1 block">
            Primary Financial Metric
          </Label>
          <Select
            value={values.financialMetric || ""}
            onValueChange={(val) => handleChange("financialMetric", val)}
          >
            <SelectTrigger id="financialMetric" className="w-full">
              <SelectValue placeholder="Select Financial Metric" />
            </SelectTrigger>
            <SelectContent>
              {financialMetricsData.map((metric) => (
                <SelectItem key={metric} value={metric}>
                  {metric}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="mt-2 text-sm text-gray-600">
            SDE = Net Profit + Owner&apos;s Salary + Owner Benefits + Non-cash
            Expenses
          </p>
        </div>

        {/* Metric Value */}
        <div className="mt-4">
          <Label htmlFor="metricValue" className="mb-1 block">
            {values.financialMetric === "Seller's Discretionary Earnings (SDE)"
              ? "SDE Amount"
              : values.financialMetric === "EBITDA"
              ? "EBITDA Amount"
              : values.financialMetric === "Revenue"
              ? "Annual Revenue"
              : "Metric Amount"}
          </Label>

          <CurrencyInput
            value={values.metricValue}
            onChange={(v) => handleChange("metricValue", v)}
            placeholder="e.g., $250,000"
          />
        </div>

        {/* Assets */}
        <div className="mt-4">
          <Label htmlFor="assets" className="mb-1 block">
            Total Assets
          </Label>
          <CurrencyInput
            value={values.assets}
            onChange={(v) => handleChange("assets", v)}
            placeholder="e.g., $150,000"
          />
        </div>

        {/* Liabilities */}
        <div className="mt-4">
          <Label htmlFor="liabilities" className="mb-1 block">
            Total Liabilities
          </Label>
          <CurrencyInput
            value={values.liabilities}
            onChange={(v) => handleChange("liabilities", v)}
            placeholder="e.g., $50,000"
          />
        </div>
      </div>

      {/* --- VALUE DRIVERS --- */}
      <div className="border px-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">📈 Value Drivers</h2>
        {[
          {
            id: "recurringRevenue",
            label: "Significant recurring/predictable revenue",
          },
          {
            id: "proprietaryTech",
            label: "Proprietary technology or processes",
          },
          { id: "strongBrand", label: "Strong brand recognition/goodwill" },
          {
            id: "managementTeam",
            label: "Strong management team (not owner-dependent)",
          },
        ].map((item) => (
          <div key={item.id} className="flex items-center space-x-2 mt-2">
            <input
              id={item.id}
              type="checkbox"
              checked={!!values[item.id]}
              onChange={(e) => handleChange(item.id, e.target.checked)}
              className="w-4 h-4 border-gray-500"
            />
            <Label htmlFor={item.id} className="text-sm">
              {item.label}
            </Label>
          </div>
        ))}
        {/* --- Calculate Button --- */}
        <div className="p-8 text-center">
          <button
            type="button"
            className={`w-full py-3 px-6 text-lg font-semibold rounded-lg text-white transition-all ${
              isFormComplete()
                ? "bg-violate-500 hover:bg-violate-800 hover:cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormComplete()}
            onClick={onCalculate}
          >
            Calculate Valuation
          </button>
          {!isFormComplete() && (
            <p className="mt-2 text-sm text-gray-500">
              Please complete all fields to calculate valuation.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
