import { User } from "../models/User";
import { RegisterDTO, UserResponseDTO } from "../types/user.types";

export const register = async ({ body, set }: any) => {
  const { name, email, password, active } = body as RegisterDTO;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      set.status = 400;
      return { error: "User already exists" };
    }
    const user = await User.create({ name, email, password, active });
    const response: UserResponseDTO ={
        _id:user.id || "",
        name:user.name || "",
        email:user.email || "",
        active:user.active
    }
    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    set.status = 500;
    return { error: "Failed to create user" };
  }
};
