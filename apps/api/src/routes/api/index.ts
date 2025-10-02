import { Hono } from "hono";

const app = new Hono().get("/", (c) => {
	return c.text("Hello Hono!");
});

export { app };
