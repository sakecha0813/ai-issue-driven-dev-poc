interface Decimal {
  coefficient: bigint;
  scale: number;
}

const DECIMAL_PATTERN = /^(?:\d+(?:\.\d*)?|\.\d+)$/;
const MAX_INPUT_LENGTH = 100;

function parseDecimal(value: unknown, name: string): Decimal {
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    value.length > MAX_INPUT_LENGTH ||
    !DECIMAL_PATTERN.test(value)
  ) {
    throw new TypeError(`${name} must be a non-negative number`);
  }

  const [whole = "0", fraction = ""] = value.split(".");
  return {
    coefficient: BigInt(`${whole || "0"}${fraction}`),
    scale: fraction.length
  };
}

export function calculateTaxIncludedPrice(
  priceInput: unknown,
  taxRateInput: unknown
): number {
  const price = parseDecimal(priceInput, "price");
  const taxRate = parseDecimal(taxRateInput, "taxRate");
  const priceScale = 10n ** BigInt(price.scale);
  const taxRateScale = 10n ** BigInt(taxRate.scale);
  const numerator = price.coefficient * (taxRateScale + taxRate.coefficient);
  const denominator = priceScale * taxRateScale;

  let rounded = numerator / denominator;
  if ((numerator % denominator) * 2n >= denominator) {
    rounded += 1n;
  }

  if (rounded > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new TypeError("calculated price is too large");
  }

  return Number(rounded);
}
