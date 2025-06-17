export function getCalculatedValues(values) {
  const {
    homePrice,
    downPayment,
    interestRate,
    loanTerm,
    propertyTaxes = 0,
    homeownersInsurance = 0,
    hoaFees = 0,
    pmi = 0,
  } = values;

  const totalPrincipal = homePrice - downPayment;
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  const monthlyPI =
    monthlyInterestRate === 0
      ? 0
      : (totalPrincipal *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  const totalInterest =
    monthlyInterestRate === 0
      ? 0
      : monthlyPI * numberOfPayments - totalPrincipal;

  const totalLoanPayment =
    monthlyInterestRate === 0 ? 0 : totalPrincipal + totalInterest;

  const totalMonthlyPayment =
    monthlyInterestRate === 0
      ? 0
      : monthlyPI +
        propertyTaxes / 12 +
        homeownersInsurance / 12 +
        hoaFees +
        pmi;

  const payoffDate = (() => {
    if (!values.startDate) return "N/A";
    const [year, month] = values.startDate.split("-").map(Number);
    const finalYear = year + Number(loanTerm);
    return `${month.toString().padStart(2, "0")} / ${finalYear}`;
  })();

  return {
    totalPrincipal,
    totalInterest,
    totalLoanPayment,
    totalMonthlyPayment,
    payoffDate,
    chartValues: {
      PrincipalAndInterest:
        monthlyInterestRate === 0 ? 0 : totalLoanPayment / (loanTerm * 12),
      PropertyTaxes: propertyTaxes / 12,
      HomeownersInsurance: homeownersInsurance / 12,
      HOA: hoaFees,
      PMI: pmi,
    },
  };
}
