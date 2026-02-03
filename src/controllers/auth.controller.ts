import { User } from "../models/User";
import { LoginDTO, RegisterDTO, toUserResponse, UpdatePasswordDTO } from "../types/user.types";
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

export const login = async ({ body, set }: any) => {
  const { email, password } = body as LoginDTO;

  // Validate required fields
  const missingFields: { [key: string]: string | undefined } = {
    email: !email ? "Email is required" : undefined,
    password: !password ? "Password is required" : undefined,
  };

  if (!email || !password) {
    const errorResponse = createValidationError(missingFields);
    set.status = errorResponse.statusCode || 400;
    return errorResponse;
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const errorResponse = createErrorResponse("Invalid credentials", 401);
      set.status = 401;
      return errorResponse;
    }

    // Check password match
    if (user.password !== password) {
      const errorResponse = createErrorResponse("Invalid credentials", 401);
      set.status = 401;
      return errorResponse;
    }

    // Return user data on successful login
    set.status = 200;
    return toUserResponse(user);
  } catch (error) {
    console.error("Error during login:", error);
    const errorResponse = createErrorResponse("Failed to login", 500);
    set.status = 500;
    return errorResponse;
  }
};

export const updatePassword = async ({ body, set }: any) => {
  const { email, currentPassword, newPassword } = body as UpdatePasswordDTO;

  // Validate required fields
  const missingFields: { [key: string]: string | undefined } = {
    email: !email ? "Email is required" : undefined,
    currentPassword: !currentPassword ? "Current password is required" : undefined,
    newPassword: !newPassword ? "New password is required" : undefined,
  };

  if (!email || !currentPassword || !newPassword) {
    const errorResponse = createValidationError(missingFields);
    set.status = errorResponse.statusCode || 400;
    return errorResponse;
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const errorResponse = createErrorResponse("User not found", 404);
      set.status = 404;
      return errorResponse;
    }

    // Verify current password
    if (user.password !== currentPassword) {
      const errorResponse = createErrorResponse("Current password is incorrect", 401);
      set.status = 401;
      return errorResponse;
    }

    // Update password
    user.password = newPassword;
    await user.save();

    set.status = 200;
    return {
      message: "Password updated successfully",
      user: toUserResponse(user),
    };
  } catch (error) {
    console.error("Error updating password:", error);
    const errorResponse = createErrorResponse("Failed to update password", 500);
    set.status = 500;
    return errorResponse;
  }
};