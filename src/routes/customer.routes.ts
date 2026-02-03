import Elysia from "elysia";
import {
  createCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller";

export const customerRoutes = new Elysia({ prefix: "/customers" })
  .post("/", createCustomer)
  .get("/", getCustomers)
  .get("/:id", getCustomerById)
  .put("/:id", updateCustomer)
  .delete("/:id", deleteCustomer);
