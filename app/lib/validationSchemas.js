import { z } from "zod";

export function createPercentageValidationSchema({
  parentField,
  childField,
  label,
  parentLabel,
}) {
  return z
    .object({
      [parentField]: z.number(),
      [childField]: z.number(),
    })
    .refine((data) => data[childField] <= data[parentField], {
      message: `${label} cannot exceed ${parentLabel}`,
      path: [childField],
    });
}
