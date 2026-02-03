import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";

// Connect to db
await connectDB();

const app = new Elysia({ prefix: "/api" })
  .use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

export default app
  .get("/", () => "Hello Elysia")
  .use(authRoutes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
