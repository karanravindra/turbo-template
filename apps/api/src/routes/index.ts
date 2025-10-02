import { Hono } from "hono";
import { Scalar } from "@scalar/hono-api-reference";
import { openAPIRouteHandler } from "hono-openapi";
import { apiRouter } from "./api";

const app = new Hono().route("/api", apiRouter);

app.get(
	"/openapi.json",
	openAPIRouteHandler(app, {
		documentation: {
			info: {
				title: "Template API",
				version: "1.0.0",
				description:
					"This is a sample API documentation for the Template project.",
			},
			components: {
				securitySchemes: {
					bearerAuth: {
						type: "http",
						scheme: "bearer",
						bearerFormat: "JWT",
					},
				},
			},
			security: [
				{
					bearerAuth: [],
				},
			],
			servers: [
				{
					url: "http://localhost:3001",
					description: "Local server",
				},
			],
		},
	}),
);
app.get("/docs", Scalar({ theme: "default", url: "/openapi.json" }));

export { app };
