import { User } from "../models/User";
import { RegisterDTO, toUserResponse } from "../types/user.types";
import { createValidationError, createErrorResponse } from "../types/error.types";

export const register = async ({ body, set }: any) => {
  const { name, email, password } = body as RegisterDTO;

  // Validate required fields
  const missingFields: { [key: string]: string | undefined } = {
    name: !name ? "Name is required" : undefined,
    email: !email ? "Email is required" : undefined,
    password: !password ? "Password is required" : undefined,
  };

  if (!name || !email || !password) {
    const errorResponse = createValidationError(missingFields);
    set.status = errorResponse.statusCode || 400;
    return errorResponse;
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const errorResponse = createErrorResponse("User already exists", 400);
      set.status = 400;
      return errorResponse;
    }

    const user = await User.create({ name, email, password });
    return toUserResponse(user);
  } catch (error) {
    console.error("Error creating user:", error);
    const errorResponse = createErrorResponse("Failed to create user", 500);
    set.status = 500;
    return errorResponse;
  }
};
