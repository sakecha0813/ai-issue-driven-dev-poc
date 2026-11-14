import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { pricesRouter } from "./routes/prices.js";

const frontendDist = fileURLToPath(new URL("../../frontend/dist/", import.meta.url));

export function createApp(staticDir = frontendDist) {
  const app = express();

  app.get("/health", (_request, response) => {
    response.json({ status: "ok" });
  });

  app.use("/api/prices", pricesRouter);
  app.use("/api", (_request, response) => {
    response.sendStatus(404);
  });

  app.use(express.static(staticDir));
  app.get("/{*path}", (_request, response) => {
    response.sendFile(path.join(staticDir, "index.html"));
  });

  return app;
}

export const app = createApp();
