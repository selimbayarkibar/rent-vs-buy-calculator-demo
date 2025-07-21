"use client";

import industryMultiples from "@/data/valuation/sdeMultiples.json";
import locationMultipliers from "@/data/valuation/locations.json";

export default function calculateValuationResults(formData) {
  const {
    industry,
    locationLabel,
    financialMetric,
    metricValue,
    assets,
    liabilities,
    recurringRevenue,
    proprietaryTech,
    strongBrand,
    managementTeam,
    years,
  } = formData;

  if (!industry || !financialMetric || !locationLabel || isNaN(metricValue)) {
    return null;
  }

  const industryData = industryMultiples[industry];
  if (!industryData?.sde || !industryData?.revenue) {
    return null;
  }

  const { sde: baseSDE, revenue: baseRevenue } = industryData;

  const locationData = locationMultipliers.find(
    (loc) => loc.label === locationLabel
  );
  const locationMultiplier = locationData?.multiplier || 1;

  let sdeMultiple = baseSDE * locationMultiplier;
  let revenueMultiple = baseRevenue * locationMultiplier;

  // Value drivers adjustment
  const adjustmentFactor =
    (recurringRevenue ? 0.4 : 0) +
    (proprietaryTech ? 0.3 : 0) +
    (strongBrand ? 0.2 : 0) +
    (managementTeam ? 0.2 : 0);

  sdeMultiple += adjustmentFactor;
  revenueMultiple += adjustmentFactor * 0.3;

  // Years in business adjustment
  const yearsNum = Number(years);
  let yearsAdj = 0;
  if (yearsNum > 10) yearsAdj = 0.2;
  else if (yearsNum > 5) yearsAdj = 0.1;
  else if (yearsNum < 2) yearsAdj = -0.2;

  sdeMultiple += yearsAdj;
  revenueMultiple += yearsAdj * 0.3;

  // Calculate earnings value based on metric type
  let earningsValue = 0;
  let multipleUsed = 0;
  let multipleLabel = "";
  let baseRevenueValue = null;

  switch (financialMetric) {
    case "Seller's Discretionary Earnings (SDE)":
      earningsValue = metricValue * sdeMultiple;
      multipleUsed = sdeMultiple;
      multipleLabel = "SDE Multiple";
      break;
    case "EBITDA":
      earningsValue = metricValue * (sdeMultiple * 1.15);
      multipleUsed = sdeMultiple * 1.15;
      multipleLabel = "EBITDA Multiple";
      break;
    case "Revenue":
      earningsValue = metricValue * revenueMultiple;
      multipleUsed = revenueMultiple;
      multipleLabel = "Revenue Multiple";
      baseRevenueValue = earningsValue;
      break;
    default:
      return null;
  }

  // Asset adjustments
  const netAssets = (assets || 0) - (liabilities || 0);
  let baseValuation = earningsValue;

  if (netAssets > earningsValue * 2) {
    baseValuation += netAssets * 0.85;
  } else if (netAssets > earningsValue) {
    baseValuation += netAssets * 0.6;
  } else if (netAssets > earningsValue * 0.5) {
    baseValuation += netAssets * 0.3;
  } else {
    baseValuation += netAssets * 0.15;
  }

  return {
    lowRange: baseValuation * 0.85,
    midRange: baseValuation,
    highRange: baseValuation * 1.15,
    baseValuation,
    baseRevenueValue,
    netAssets,
    multipleUsed,
    multipleLabel,
  };
}
