import Elysia from "elysia";
import {
  createProfile,
  getProfile,
  updateLogo,
  updateProfile,
} from "../controllers/profile.controller";

export const profileRoutes = new Elysia({ prefix: "/profile" })
  .post("/", createProfile)
  .get("/", getProfile)
  .put("/", updateProfile)
  .post("/logo", updateLogo);
