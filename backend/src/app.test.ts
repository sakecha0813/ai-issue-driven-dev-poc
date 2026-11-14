import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import request from "supertest";
import { afterAll, describe, expect, it } from "vitest";
import { createApp } from "./app.js";

const staticDir = mkdtempSync(path.join(tmpdir(), "price-calculator-"));
mkdirSync(path.join(staticDir, "assets"));
writeFileSync(path.join(staticDir, "index.html"), "<html>SPA</html>");
writeFileSync(path.join(staticDir, "assets", "app.js"), "console.log('app');");
const app = createApp(staticDir);

afterAll(() => {
  rmSync(staticDir, { recursive: true, force: true });
});

describe("production web server", () => {
  it("returns an independent health check", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  it("serves the frontend and static assets", async () => {
    const index = await request(app).get("/");
    expect(index.status).toBe(200);
    expect(index.text).toBe("<html>SPA</html>");

    const asset = await request(app).get("/assets/app.js");
    expect(asset.status).toBe(200);
    expect(asset.text).toBe("console.log('app');");
  });

  it("falls back to the frontend for screen routes", async () => {
    const response = await request(app).get("/some/screen");
    expect(response.status).toBe(200);
    expect(response.text).toBe("<html>SPA</html>");
  });

  it.each(["/api", "/api/missing", "/API/prices/missing"])(
    "does not fall back for an unknown API path %s",
    async (url) => {
      const response = await request(app).get(url);
      expect(response.status).toBe(404);
      expect(response.text).not.toContain("SPA");
    }
  );
});
