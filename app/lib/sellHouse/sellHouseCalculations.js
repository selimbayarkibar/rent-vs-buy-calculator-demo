import stateTaxRates from "@/data/stateTaxRates.json";

export default function calculateSellHouseResults(values) {
  const {
    homeState,
    purchasePrice,
    homeImprovements = 0,
    salesPrice,
    owned,
    filingStatus,
    primaryResidence,
  } = values;

  const HOME_SALES_COST_RATE = 0.073;
  const V_TAX_DISCOUNT = 0.75; // 75% reduction on taxes
  const V_SALES_COST_DISCOUNT = 0.25; // 25% reduction on sales costs

  // --- Inputs ---
  const adjustedCostBasis = purchasePrice + homeImprovements;
  const isLongTerm = owned === "yes";
  const isJoint = filingStatus === "joint";
  const isPrimary = primaryResidence === "yes";

  const exemption = isPrimary ? (isJoint ? 500_000 : 250_000) : 0;
  const saleNetBeforeV = salesPrice * (1 - HOME_SALES_COST_RATE);
  const saleNetAfterV =
    salesPrice * (1 - HOME_SALES_COST_RATE * (1 - V_SALES_COST_DISCOUNT));

  const grossGains = saleNetBeforeV - adjustedCostBasis;
  const netGains = Math.max(grossGains - exemption, 0);

  const taxRate = stateTaxRates[homeState]
    ? isLongTerm
      ? stateTaxRates[homeState].long
      : stateTaxRates[homeState].short
    : 0;

  const taxesBeforeV = netGains * taxRate;
  const taxesAfterV = taxesBeforeV * (1 - V_TAX_DISCOUNT);

  // --- Final Calculations ---
  const moneyLeftBeforeV = saleNetBeforeV - taxesBeforeV;
  const moneyLeftAfterV = saleNetAfterV - taxesAfterV;
  const vImpact = moneyLeftAfterV - moneyLeftBeforeV;

  return {
    moneyLeftBeforeV,
    moneyLeftAfterV,
    vImpact,
  };
}
