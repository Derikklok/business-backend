import Elysia from "elysia";
import { register } from "../controllers/auth.controller";


export default new Elysia({prefix:"/auth"})
.post("/register",register);