import Elysia from "elysia";
import {
  createInventory,
  deleteInventory,
  getInventoryByDocument,
  updateInventory,
} from "../controllers/inventory.controller";

export const inventoryRoutes = new Elysia({ prefix: "/inventory" })
  .post("/", createInventory)
  .get("/document/:documentId", getInventoryByDocument)
  .put("/:id", updateInventory)
  .delete("/:id", deleteInventory);
