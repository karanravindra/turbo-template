import { Hono } from "hono";
import { healthRouter } from "./health";

const app = new Hono().route("/health", healthRouter);

export { app as apiRouter };
