import Elysia from "elysia";
import { createCustomer } from "../controllers/customer.controller";

export const customerRoutes = new Elysia({prefix:"/customers"})
.post("/",createCustomer)