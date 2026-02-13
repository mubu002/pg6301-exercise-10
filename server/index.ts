import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

// Test-endpoint
app.get("/api/userinfo", (c) => {
  return c.json({ error: "Unauthenticated" }, 401);
});

const port = process.env.PORT || 3000;

serve({
  fetch: app.fetch,
  port: Number(port),
});
