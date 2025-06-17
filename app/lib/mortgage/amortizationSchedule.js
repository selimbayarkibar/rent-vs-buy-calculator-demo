export function generateAmortizationSchedule({
  homePrice,
  downPayment,
  interestRate,
  loanTerm,
  startDate,
}) {
  const principal = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  const monthlyPI =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  let balance = principal;
  const schedule = [];

  const [startYear, startMonth] = startDate
    .split("-")
    .map((n) => parseInt(n, 10));
  let currentMonth = startMonth - 1;
  let currentYear = startYear;

  for (let i = 0; i < numberOfPayments - 1; i++) {
    const interest = balance * monthlyRate;
    const principalPaid = monthlyPI - interest;
    balance -= principalPaid;

    schedule.push({
      date: new Date(currentYear, currentMonth).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      }),
      principal: principalPaid,
      interest,
      total: monthlyPI,
      balance,
    });

    currentMonth++;
    if (currentMonth === 12) {
      currentMonth = 0;
      currentYear++;
    }
  }

  // Final month
  const finalInterest = balance * monthlyRate;
  const finalPrincipal = balance;
  schedule.push({
    date: new Date(currentYear, currentMonth).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    }),
    principal: finalPrincipal,
    interest: finalInterest,
    total: finalPrincipal + finalInterest,
    balance: 0,
  });

  return schedule;
}
