import Elysia from "elysia";
import {
  createDocument,
  getDocuments,
} from "../controllers/document.controller";

export const documentRoutes = new Elysia({
  prefix: "/documents",
})
  .post("/", createDocument)
  .get("/", getDocuments);
