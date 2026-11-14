import express from "express";
import { pricesRouter } from "./routes/prices.js";

export const app = express();

app.use("/api/prices", pricesRouter);
