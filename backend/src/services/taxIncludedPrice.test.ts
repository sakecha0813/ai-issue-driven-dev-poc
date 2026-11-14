import { describe, expect, it } from "vitest";
import { calculateTaxIncludedPrice } from "./taxIncludedPrice.js";

describe("calculateTaxIncludedPrice", () => {
  it.each([
    ["1000", "0.10", 1100],
    ["999", "0.10", 1099],
    ["105", "0.10", 116],
    ["0", "0.10", 0],
    ["1000", "0", 1000],
    ["1", "0.5", 2],
    ["1.25", "0.1", 1]
  ])("calculates %s at a tax rate of %s", (price, taxRate, expected) => {
    expect(calculateTaxIncludedPrice(price, taxRate)).toBe(expected);
  });

  it.each([
    [undefined, "0.1"],
    ["100", undefined],
    [null, "0.1"],
    ["100", null],
    ["-1", "0.1"],
    ["100", "-0.1"],
    ["not-a-number", "0.1"],
    ["100", "Infinity"],
    ["1".repeat(101), "0"]
  ])("rejects invalid input %s and %s", (price, taxRate) => {
    expect(() => calculateTaxIncludedPrice(price, taxRate)).toThrow(TypeError);
  });

  it("rejects results outside the safe integer range", () => {
    expect(() =>
      calculateTaxIncludedPrice("9007199254740992", "0")
    ).toThrow(TypeError);
  });
});
