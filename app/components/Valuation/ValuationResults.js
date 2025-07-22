export default function ValuationResults({ results, businessName }) {
  const {
    lowRange,
    midRange,
    highRange,
    multipleLabel,
    multipleUsed,
    baseRevenueValue,
    netAssets,
    baseValuation,
  } = results;

  return (
    <div className="rounded-lg space-y-4 text-lg">
      {/* Header + Valuation Ranges */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-center text-gray-800">
          {businessName
            ? `${businessName}'s Estimated Valuation`
            : "Your Company's Estimated Valuation"}
        </h2>
      </div>

      {/* Valuation Boxes */}
      <div className="bg-gray-100 text-black rounded-xl p-6 text-center">
        <p className="font-semibold">Low Range</p>
        <p className="text-3xl font-bold">
          $
          {lowRange?.toLocaleString(undefined, { maximumFractionDigits: 0 }) ||
            "N/A"}
        </p>
      </div>
      <div className="bg-violate-500 text-white rounded-xl p-6 text-center">
        <p className="font-semibold">Most Likely</p>
        <p className="text-3xl font-bold">
          $
          {midRange?.toLocaleString(undefined, { maximumFractionDigits: 0 }) ||
            "N/A"}
        </p>
      </div>
      <div className="bg-violate-100 text-black rounded-xl p-6 text-center">
        <p className="font-semibold">High Range</p>
        <p className="text-3xl font-bold">
          $
          {highRange?.toLocaleString(undefined, { maximumFractionDigits: 0 }) ||
            "N/A"}
        </p>
      </div>

      {/* Valuation Details */}
      <div className="bg-white text-black rounded-xl p-6 border border-gray-300 space-y-2">
        <h3 className="text-lg font-semibold">Valuation Details:</h3>
        {multipleLabel && multipleUsed && (
          <p>
            {multipleLabel}: <strong>{multipleUsed.toFixed(2)}x</strong>
          </p>
        )}
        {baseRevenueValue && (
          <p>
            Base Revenue Value:{" "}
            <strong>
              $
              {baseRevenueValue.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </strong>
          </p>
        )}
        <p>
          Net Assets (Assets – Liabilities):{" "}
          <strong>
            $
            {netAssets?.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            }) || 0}
          </strong>
        </p>
        <p>
          Total Base Valuation:{" "}
          <strong>
            $
            {baseValuation?.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            }) || 0}
          </strong>
        </p>
      </div>

      {/* Disclaimer Section */}
      <div className="bg-yellow-100 text-black rounded-xl p-6 border border-yellow-300">
        <h4 className="text-lg font-semibold flex items-center mb-2">
          <span className="mr-2">⚠️</span>Important Disclaimer
        </h4>
        <p className="mb-3">
          This valuation uses industry multiples based on BizBuySell market data
          from thousands of actual business sales. However, actual business
          value can vary significantly based on factors including:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Detailed financial analysis and due diligence</li>
          <li>Market conditions and timing</li>
          <li>Specific buyer synergies</li>
          <li>Customer concentration and quality</li>
          <li>Growth trends and future potential</li>
          <li>Competitive advantages and risks</li>
        </ul>
        <p className="mt-3 font-medium">
          For a more accurate valuation, consider getting a professional
          business appraisal.
        </p>
        <p className="mt-2 text-sm italic">
          *Industry multiples sourced from BizBuySell market data (Q1 2020 – Q4
          2024)
        </p>
      </div>
    </div>
  );
}
