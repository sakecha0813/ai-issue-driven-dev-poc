import { Router } from "express";
import { calculateTaxIncludedPrice } from "../services/taxIncludedPrice.js";

export const pricesRouter = Router();

pricesRouter.get("/tax-included", (request, response) => {
  try {
    const taxIncludedPrice = calculateTaxIncludedPrice(
      request.query.price,
      request.query.taxRate
    );
    response.json({ taxIncludedPrice });
  } catch (error) {
    if (error instanceof TypeError) {
      response.status(400).json({ error: error.message });
      return;
    }
    throw error;
  }
});
