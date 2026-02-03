import Elysia from "elysia";
import { register, login, updatePassword } from "../controllers/auth.controller";


export default new Elysia({prefix:"/auth"})
.post("/register",register)
.post("/login", login)
.patch("/update-password", updatePassword);