import Elysia from "elysia";
import {
  createDocument,
  deleteDocument,
  getDocumentById,
  getDocuments,
  getDocumentsByCustomer,
  updateDocument,
} from "../controllers/document.controller";

export const documentRoutes = new Elysia({
  prefix: "/documents",
})
  .post("/", createDocument)
  .get("/", getDocuments)
  .get("/:id", getDocumentById)
  .get("/v2/:customerId", getDocumentsByCustomer)
  .put("/:id", updateDocument)
  .delete("/:id", deleteDocument);
