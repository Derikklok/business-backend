import Elysia from "elysia";
import {
  createDocument,
  deleteDocument,
  getDocumentById,
  getDocuments,
  updateDocument,
} from "../controllers/document.controller";

export const documentRoutes = new Elysia({
  prefix: "/documents",
})
  .post("/", createDocument)
  .get("/", getDocuments)
  .get("/:id", getDocumentById)
  .put("/:id", updateDocument)
  .delete("/:id", deleteDocument);
