import { useMemo } from "react";
import { generateAmortizationSchedule } from "@/lib/mortgage/amortizationSchedule";

function formatNumber(value) {
  return value?.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function MortgageTable({ values }) {
  const schedule = useMemo(
    () => generateAmortizationSchedule(values),
    [values]
  );

  const totalPrincipal = schedule.reduce((sum, row) => sum + row.principal, 0);
  const totalInterest = schedule.reduce((sum, row) => sum + row.interest, 0);
  const totalPayment = schedule.reduce((sum, row) => sum + row.total, 0);

  return (
    <div className="overflow-auto max-h-[500px] mt-6 rounded">
      <table className="w-full table-auto text-sm text-left text-black">
        <thead className="bg-white sticky top-0 z-10">
          <tr className="border-b border-black">
            <th className="px-4 py-2">Payment Date</th>
            <th className="px-4 py-2">Principal</th>
            <th className="px-4 py-2">Interest</th>
            <th className="px-4 py-2">Monthly Total</th>
            <th className="px-4 py-2">Principal Balance</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((row, i) => (
            <tr key={i} className="border-t border-gray-400">
              <td className="px-4 py-2">{row.date}</td>
              <td className="px-4 py-2">${formatNumber(row.principal)}</td>
              <td className="px-4 py-2">${formatNumber(row.interest)}</td>
              <td className="px-4 py-2">${formatNumber(row.total)}</td>
              <td className="px-4 py-2">${formatNumber(row.balance)}</td>
            </tr>
          ))}
          <tr className="font-semibold border-t border-gray-400">
            <td className="px-4 py-2">Total</td>
            <td className="px-4 py-2">${formatNumber(totalPrincipal)}</td>
            <td className="px-4 py-2">${formatNumber(totalInterest)}</td>
            <td className="px-4 py-2">${formatNumber(totalPayment)}</td>
            <td className="px-4 py-2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
