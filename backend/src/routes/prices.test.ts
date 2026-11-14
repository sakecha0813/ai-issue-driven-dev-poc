import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../app.js";

describe("GET /api/prices/tax-included", () => {
  it("returns the calculated price as JSON", async () => {
    const response = await request(app)
      .get("/api/prices/tax-included")
      .query({ price: "1000", taxRate: "0.10" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ taxIncludedPrice: 1100 });
  });

  it.each([
    ["/api/prices/tax-included?price=1000", 400],
    ["/api/prices/tax-included?price=-1&taxRate=0.1", 400],
    ["/api/prices/tax-included?price=100&taxRate=bad", 400],
    ["/api/prices/tax-included?price=100&price=200&taxRate=0.1", 400]
  ])("rejects invalid request %s", async (path, status) => {
    const response = await request(app).get(path);

    expect(response.status).toBe(status);
    expect(response.body).toHaveProperty("error");
  });
});
