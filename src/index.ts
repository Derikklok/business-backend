import { Elysia } from "elysia";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";

// Connect to db
await connectDB();

const app = new Elysia({ prefix: "/api" });
export default app
  .get("/", () => "Hello Elysia")
  .use(authRoutes)
  .listen(3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
