"use client";

import { useState, useMemo, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// Custom tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  const rent = payload.find((p) => p.name === "Rent")?.value;
  const buy = payload.find((p) => p.name === "Buy")?.value;

  return (
    <div className="bg-white p-3 rounded shadow text-sm border border-gray-200">
      <div className="font-semibold text-gray-700 mb-1">
        Cost after {label} year{label > 1 ? "s" : ""}
      </div>
      <div className="text-blue-600">Rent: ${rent?.toLocaleString()}/month</div>
      <div className="text-green-600">Buy: ${buy?.toLocaleString()}/month</div>
    </div>
  );
};

export default function RentVsBuyGraph(props) {
  const years = 30;
  const activeYear = props.activeYear;
  const setActiveYear = props.onYearChange;

  const data = useMemo(() => {
    const {
      monthlyRent,
      securityDeposit = 1,
      brokerFee = 0,
      rentersInsurance = 12,
      rentIncrease = 3,
      purchasePrice,
      downPayment,
      downPaymentPercentage = 0,
      closingCosts = 6,
      propertyTaxRate = 1.5,
      hoaFees = 0,
      pmi = 0.98,
      utilityCosts = 100,
      maintenance = 6225,
      homeownersInsurance,
      interestRate,
      loanTerm = 30,
      homeAppreciation = 4.5,
      sellingCosts = 6,
      marginalTaxRate = 22,
      generalInflationRate = 3,
    } = props;

    const r = (Number(interestRate) || 0) / 100 / 12;
    const n = loanTerm * 12;
    const loanAmount = purchasePrice - downPayment;

    function getMonthlyMortgagePayment() {
      if (interestRate === 0 || r === 0) return loanAmount / n;
      return (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const mortgagePayment = getMonthlyMortgagePayment();
    const chartData = [];

    for (let year = 1; year <= years; year++) {
      const months = year * 12;

      const initialCostsRent =
        monthlyRent * securityDeposit +
        (brokerFee / 100) * monthlyRent * months;

      const recurringCostsRent =
        rentersInsurance * months +
        Math.pow(1 + rentIncrease / 100, year - 1) * monthlyRent * months;

      const netProceedsRent = -monthlyRent * securityDeposit;

      const totalRent = initialCostsRent + recurringCostsRent + netProceedsRent;
      const monthlyRentCost = totalRent / months;

      const initialCostsBuy =
        downPayment +
        (closingCosts / 100) * purchasePrice -
        (closingCosts / 100) * purchasePrice * (downPaymentPercentage / 100);

      const effectivePropertyTax =
        (propertyTaxRate / 100) *
        purchasePrice *
        (1 - marginalTaxRate / 100) *
        year;

      const recurringCostsBuy =
        hoaFees * months +
        utilityCosts * months +
        maintenance * year +
        homeownersInsurance * year +
        loanAmount * (pmi / 100) * year +
        mortgagePayment * months +
        effectivePropertyTax;

      const totalPaid = mortgagePayment * 12;
      const balanceAfterYear =
        r === 0
          ? loanAmount - (loanAmount / n) * 12
          : loanAmount *
            ((Math.pow(1 + r, n) - Math.pow(1 + r, 12)) /
              (Math.pow(1 + r, n) - 1));

      const principalPaid = loanAmount - balanceAfterYear;
      const equity = downPayment + principalPaid;

      const netProceedsBuy = -(
        (homeAppreciation / 100) * purchasePrice * year +
        (purchasePrice - balanceAfterYear - totalPaid + equity) -
        (sellingCosts / 100) * purchasePrice
      );

      const totalBuy = initialCostsBuy + recurringCostsBuy + netProceedsBuy;
      const monthlyBuyCost = totalBuy / months;

      const totalInflationAdjustedRent =
        totalRent / Math.pow(1 + generalInflationRate / 100, year);
      const totalInflationAdjustedBuy =
        totalBuy / Math.pow(1 + generalInflationRate / 100, year);

      chartData.push({
        year,
        Rent: Math.round(monthlyRentCost),
        Buy: Math.round(monthlyBuyCost),
        initialCostsRent,
        recurringCostsRent,
        netProceedsRent,
        totalInflationAdjustedRent,
        initialCostsBuy,
        recurringCostsBuy,
        netProceedsBuy,
        totalInflationAdjustedBuy,
      });
    }

    return chartData;
  }, [props]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    props.onGraphDataChange?.(data);
  }, [
    props.monthlyRent,
    props.securityDeposit,
    props.brokerFee,
    props.rentersInsurance,
    props.rentIncrease,
    props.purchasePrice,
    props.downPayment,
    props.downPaymentPercentage,
    props.closingCosts,
    props.propertyTaxRate,
    props.hoaFees,
    props.pmi,
    props.utilityCosts,
    props.maintenance,
    props.homeownersInsurance,
    props.interestRate,
    props.loanTerm,
    props.homeAppreciation,
    props.sellingCosts,
    props.marginalTaxRate,
    props.generalInflationRate,
  ]);

  const current = data.find((d) => d.year === activeYear);
  const recommendation = current.Rent < current.Buy ? "renting" : "buying";
  const monthlyDifference = Math.abs(
    current.Rent - current.Buy
  ).toLocaleString();
  const breakEvenYear = data.reduce(
    (closest, yearData) => {
      const diff = Math.abs(yearData.Rent - yearData.Buy);
      return diff < Math.abs(closest.diff)
        ? { year: yearData.year, diff }
        : closest;
    },
    { year: null, diff: Infinity }
  ).year;
  const allRentMore = data.every((d) => d.Rent > d.Buy);
  const allBuyMore = data.every((d) => d.Buy > d.Rent);
  const showBreakEven = !allRentMore && !allBuyMore;

  return (
    <div className="mt-6 w-full h-[450px]">
      <h2 className="text-xl font-semibold text-center mb-1">
        {allRentMore ? (
          <>
            <span className="text-green-600">Buying </span> will always cost
            less.
          </>
        ) : allBuyMore ? (
          <>
            <span className="text-blue-600">Renting </span> will always cost
            less.
          </>
        ) : (
          <>
            If you stay {activeYear} year{activeYear > 1 ? "s" : ""},{" "}
            <span
              className={
                recommendation === "renting"
                  ? "text-blue-600"
                  : "text-green-600"
              }
            >
              {recommendation} costs less.
            </span>
          </>
        )}
      </h2>

      <p className="text-center mb-2 text-gray-700">
        You could save about ${monthlyDifference}/month.
      </p>
      <ResponsiveContainer width="90%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 40, left: 30, bottom: 20 }}
          onClick={(e) => {
            if (e?.activeLabel) {
              setActiveYear(e.activeLabel);
            }
          }}
        >
          <XAxis
            dataKey="year"
            ticks={[5, 10, 15, 20, 25, 30]}
            tickLine={false}
            label={{
              value: "Years",
              position: "bottom",
              offset: -5,
              dy: 5,
            }}
            domain={[1, years]}
          />
          <YAxis
            tickFormatter={(value) => `$${Math.round(value).toLocaleString()}`}
            label={{
              value: "Cost per month",
              angle: 0,
              position: "insideTopLeft",
              offset: -10,
              dy: -20,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            content={({ payload }) => (
              <div className="flex justify-end gap-4 px-4 pt-1 mt-4 text-sm text-gray-700">
                {payload.map((entry) => (
                  <div key={entry.value} className="flex items-center gap-1">
                    <svg width={14} height={14}>
                      <line
                        x1="0"
                        y1="7"
                        x2="14"
                        y2="7"
                        stroke={entry.color}
                        strokeWidth="2"
                        strokeDasharray={entry.strokeDasharray || "0"}
                      />
                    </svg>
                    {entry.value}
                  </div>
                ))}
                {breakEvenYear && (
                  <div className="flex items-center gap-1">
                    <svg width={14} height={14}>
                      <line
                        x1="0"
                        y1="7"
                        x2="14"
                        y2="7"
                        stroke="darkred"
                        strokeWidth="2"
                        strokeDasharray="6 3"
                      />
                    </svg>
                    Break-even
                  </div>
                )}
              </div>
            )}
          />
          <Line
            type="monotone"
            dataKey="Rent"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={({ cx, cy, payload }) =>
              payload.year === activeYear ? (
                <circle
                  key={`rent-dot-${payload.year}`}
                  cx={cx}
                  cy={cy}
                  r={4}
                  fill="#3B82F6"
                />
              ) : null
            }
          />
          <Line
            type="monotone"
            dataKey="Buy"
            stroke="#10B981"
            strokeWidth={2}
            dot={({ cx, cy, payload }) =>
              payload.year === activeYear ? (
                <circle
                  key={`buy-dot-${payload.year}`}
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill="#10B981"
                />
              ) : null
            }
          />
          {/* Break-even line */}
          {showBreakEven && breakEvenYear && (
            <ReferenceLine
              x={breakEvenYear}
              stroke="darkred"
              strokeDasharray="6 3"
              label={{
                position: "insideBottom",
                fill: "darkred",
                fontSize: 12,
              }}
            />
          )}
          {/* Active year line */}
          <ReferenceLine x={activeYear} stroke="#3B82F6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
