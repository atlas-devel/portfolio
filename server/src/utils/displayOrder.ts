export const parseDisplayOrder = (value: unknown): number => {
  const order = value === undefined || value === null || value === ""
    ? 1000
    : typeof value === "number" ? value : Number(value);
  if (!Number.isSafeInteger(order) || order < 1) {
    throw new Error("Validation: display order must be a positive whole number");
  }
  return order;
};
