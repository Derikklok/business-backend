import Elysia from "elysia";
import { createDocument } from "../controllers/document.controller";

export const documentRoutes = new Elysia({
  prefix: "/documents",
}).post("/", createDocument);
