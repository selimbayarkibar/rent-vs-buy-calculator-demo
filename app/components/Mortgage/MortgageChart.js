"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";

export default function MortgageChart({ values, calculations }) {
  const {
    totalMonthlyPayment,
    totalPrincipal,
    totalInterest,
    totalLoanPayment,
    payoffDate,
  } = calculations;

  const rawChartData = [
    {
      name: "Principal and Interest",
      value: calculations.totalLoanPayment / (values.loanTerm * 12),
    },
    ...(values.propertyTaxes > 0
      ? [{ name: "Property Taxes", value: values.propertyTaxes / 12 }]
      : []),
    ...(values.homeownersInsurance > 0
      ? [
          {
            name: "Homeowners Insurance",
            value: values.homeownersInsurance / 12,
          },
        ]
      : []),
    ...(values.hoaFees > 0
      ? [{ name: "HOA Fees", value: values.hoaFees }]
      : []),
    ...(values.pmi > 0 ? [{ name: "PMI", value: values.pmi }] : []),
  ];

  const [visibleSections, setVisibleSections] = useState(
    rawChartData.map((entry) => entry.name)
  );
  const [activeIndex, setActiveIndex] = useState(null);

  const filteredChartData = rawChartData.filter((entry) =>
    visibleSections.includes(entry.name)
  );

  useEffect(() => {
    const dynamicVisible = rawChartData.map((entry) => entry.name);
    setVisibleSections((prev) => {
      const prevSet = new Set(prev);
      const shouldUpdate =
        dynamicVisible.length !== prev.length ||
        dynamicVisible.some((v) => !prevSet.has(v));
      return shouldUpdate ? dynamicVisible : prev;
    });
  }, [
    values.propertyTaxes,
    values.homeownersInsurance,
    values.hoaFees,
    values.pmi,
  ]);

  const COLORS = {
    "Principal and Interest": "#74B72E",
    "Homeowners Insurance": "#006400",
    "Property Taxes": "#FDA50F",
    "HOA Fees": "#C80815",
    PMI: "#57A0D2",
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      const { name, value, fill } = payload[0];
      return (
        <div className="bg-white p-2 border shadow rounded text-sm">
          <div className="flex items-center gap-2">
            <div
              style={{ backgroundColor: COLORS[name] || fill }}
              className="w-3 h-3 rounded-full"
            />
            <span>{name}</span>
          </div>
          <div className="font-black">${value.toFixed(2)}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col lg:flex-row w-full">
      {/* Chart Side */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
        <h2 className="text-lg mb-2 text-black">Total Monthly Payment</h2>
        <p className="text-3xl font-bold text-[#006400] mb-4">
          $
          {Number(totalMonthlyPayment || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={filteredChartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              dataKey="value"
              paddingAngle={2}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {filteredChartData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[entry.name]}
                  fillOpacity={
                    activeIndex === null || activeIndex === index ? 1 : 0.3
                  }
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
          {rawChartData.map((entry) => {
            const filteredIndex = filteredChartData.findIndex(
              (e) => e.name === entry.name
            );
            const isHovered = activeIndex === filteredIndex;
            const isVisible = visibleSections.includes(entry.name);

            return (
              <div
                key={entry.name}
                className="flex items-center gap-2 cursor-pointer select-none"
                onMouseEnter={() => setActiveIndex(filteredIndex)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => {
                  setVisibleSections((prev) =>
                    isVisible
                      ? prev.filter((name) => name !== entry.name)
                      : [...prev, entry.name]
                  );
                }}
                style={{ opacity: isVisible ? 1 : 0.3 }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: COLORS[entry.name],
                    opacity: isVisible ? 1 : 0.3,
                  }}
                />
                <span className="font-semibold text-gray-700">
                  {entry.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Breakdown Side */}
      <div className="w-full lg:w-1/2 mt-6 text-gray-700 space-y-3 text-md text-left">
        <div className="mb-10">
          <p className="">Total Principal</p>
          <p className="font-black">
            $
            {totalPrincipal.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="mb-10">
          <p className="">Total Interest Payments</p>
          <p className="font-black">
            $
            {totalInterest.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="mb-10">
          <p className="">Total Loan Payments</p>
          <p className="font-black">
            $
            {totalLoanPayment.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div>
          <p>Payoff Date</p>
          <p className="font-black">{payoffDate}</p>
        </div>
      </div>
    </div>
  );
}
