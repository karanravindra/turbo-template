import { Hono } from "hono";
import { describeRoute, resolver, validator as zValidator } from "hono-openapi";
import z from "zod";

const app = new Hono().get(
	"/",
	describeRoute({
		summary: "Health Check",
		description: "A simple health check endpoint.",
		tags: ["Health"],
		responses: {
			200: {
				description: "Successful response",
				content: {
					"application/json": {
						schema: resolver(z.object({ message: z.string() })),
					},
				},
			},
		},
	}),
	zValidator("query", z.object({ name: z.string().optional() })),
	(c) => {
		const query = c.req.valid("query");
		return c.text(`Hello ${query?.name ?? "Hono"}!`);
	},
);

export { app as healthRouter };
