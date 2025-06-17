"use client";

export default function ResultsTable({ activeYear, yearData }) {
  if (!yearData) return null;

  const cheaper = yearData.Rent < yearData.Buy ? "Renting" : "Buying";
  const moreExpensive = cheaper === "Renting" ? "buying" : "renting";

  const format = (val) =>
    typeof val === "number"
      ? `$${val.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}`
      : "-";

  const rawDifference = Math.abs(yearData.Buy - yearData.Rent);
  const totalDifference = rawDifference * activeYear * 12;
  const formattedTotal = totalDifference.toLocaleString();

  return (
    <div className="p-4 text-sm text-black">
      <h3 className="font-semibold mb-1">
        Total costs after {activeYear} year{activeYear > 1 ? "s" : ""}
      </h3>
      <p className="mb-4">
        {cheaper} is ${formattedTotal} less than {moreExpensive}.
      </p>

      <div className="grid grid-cols-3 gap-4 text-md">
        <div></div>
        <div className="col-span-3 border-b border-black pb-2 grid grid-cols-3">
          <div></div>
          <div className="font-semibold pl-2">Rent</div>
          <div className="font-semibold pl-4">Buy</div>
        </div>

        <div className="font-semibold">Initial costs</div>
        <div>{format(yearData.initialCostsRent)}</div>
        <div>{format(yearData.initialCostsBuy)}</div>

        <div className="font-semibold">Recurring costs</div>
        <div>{format(yearData.recurringCostsRent)}</div>
        <div>{format(yearData.recurringCostsBuy)}</div>

        <div className="font-semibold">Net proceeds</div>
        <div>{format(yearData.netProceedsRent)}</div>
        <div>{format(yearData.netProceedsBuy)}</div>

        <div className="col-span-3 border-t border-black my-2"></div>

        <div className="font-semibold">Total (Inflation adjusted)</div>
        <div>{format(yearData.totalInflationAdjustedRent)}</div>
        <div>{format(yearData.totalInflationAdjustedBuy)}</div>
      </div>
    </div>
  );
}
