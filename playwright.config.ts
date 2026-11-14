import { defineConfig, devices } from "@playwright/test";

const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: isCI ? [["html", { open: "never" }], ["list"]] : "list",
  use: {
    baseURL: "http://localhost:5173",
    screenshot: "only-on-failure",
    trace: "retain-on-failure"
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: "npm run dev --workspace backend",
      url: "http://localhost:3001/api/prices/tax-included?price=1&taxRate=0",
      env: { PORT: "3001" },
      reuseExistingServer: !isCI,
      timeout: 60_000
    },
    {
      command: "npm run dev --workspace frontend -- --port 5173 --strictPort",
      url: "http://localhost:5173",
      reuseExistingServer: !isCI,
      timeout: 60_000
    }
  ]
});
