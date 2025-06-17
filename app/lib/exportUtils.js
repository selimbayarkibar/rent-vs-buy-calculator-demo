export function downloadCSV(data, filename) {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((header) => {
      const value = row[header];
      if (typeof value === "number") {
        return value.toFixed(2); // Round to 2 decimal places
      }
      return value;
    })
  );

  // Add totals row (only numeric columns)
  const totals = headers.map((header) => {
    const columnValues = data.map((row) => row[header]);
    const numericValues = columnValues.filter((v) => typeof v === "number");

    if (numericValues.length === 0) return "Total";
    const total = numericValues.reduce((sum, v) => sum + v, 0);
    return total.toFixed(2);
  });

  const csvContent = [
    headers.join(","),
    ...rows.map((r) => r.join(",")),
    totals.join(","), // Add the totals row
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
