import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import { customerRoutes } from "./routes/customer.routes";
import { profileRoutes } from "./routes/profile.routes";
import { documentRoutes } from "./routes/document.routes";
import { inventoryRoutes } from "./routes/inventory.routes";

// Connect to db
await connectDB();

const app = new Elysia({ prefix: "/api" }).use(
  cors({
    origin: [
      "https://forklift-client.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

export default app
  .get("/", () => "Hello Elysia")
  .use(authRoutes)
  .use(customerRoutes)
  .use(profileRoutes)
  .use(documentRoutes)
  .use(inventoryRoutes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
