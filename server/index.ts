import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

// Test-endpoint
app.get("/api/login/google/start", async (c) => {
  // 1. Hent OpenID configuration fra Google
  const configRes = await fetch(
      "https://accounts.google.com/.well-known/openid-configuration"
  );

  const config = await configRes.json();

  const authorizationEndpoint = config.authorization_endpoint;

  // 2. Bygg query parameters
  const query = {
    client_id: "TEST_CLIENT_ID",
    redirect_uri: "http://localhost:5173/api/login/google/complete",
    response_type: "code",
    scope: "email"
  };

  const url =
      authorizationEndpoint + "?" + new URLSearchParams(query);

  // 3. Redirect bruker til Google
  return c.redirect(url);
});

const port = process.env.PORT || 3000;

serve({
  fetch: app.fetch,
  port: Number(port),
});
