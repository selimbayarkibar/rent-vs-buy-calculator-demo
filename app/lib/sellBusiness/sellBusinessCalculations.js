import stateTaxRates from "@/data/stateTaxRates.json";

export default function calculateBusinessSale(values) {
  const BUSINESS_SALES_COST_RATE = 0.075; // 7.5%
  const V_TAX_DISCOUNT = 0.75; // 75% reduction on taxes
  const V_SALES_COST_DISCOUNT = 0.25; // 25% reduction on sales costs

  const {
    businessState,
    percentOfOwnership,
    purchasePrice,
    salesPrice,
    owned,
    filingStatus,
  } = values;

  const isLongTerm = owned === "yes";

  const ownershipFactor = percentOfOwnership / 100;
  const costPortion = purchasePrice * ownershipFactor;
  const salesPortion = salesPrice * ownershipFactor;

  const netPrice = salesPortion * (1 - BUSINESS_SALES_COST_RATE);
  const netPriceV =
    salesPortion * (1 - BUSINESS_SALES_COST_RATE * (1 - V_SALES_COST_DISCOUNT));

  const grossGains = netPrice - costPortion;
  const exemption = filingStatus === "joint" ? 500000 : 250000;
  const netGains = Math.max(grossGains - exemption, 0);

  const taxRate = isLongTerm
    ? stateTaxRates[businessState].long
    : stateTaxRates[businessState].short;
  const capTax = netGains * taxRate;
  const capTaxV = capTax * (1 - V_TAX_DISCOUNT);

  const moneyLeftBeforeV = netPrice - capTax;
  const moneyLeftAfterV = netPriceV - capTaxV;
  const vImpact = moneyLeftAfterV - moneyLeftBeforeV;
  console.log({
    moneyLeftBeforeV,
    moneyLeftAfterV,
    vImpact,
  });

  return {
    moneyLeftBeforeV,
    moneyLeftAfterV,
    vImpact,
  };
}
