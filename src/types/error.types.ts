export interface ValidationError {
  [key: string]: string | undefined;
}

export interface ErrorResponseDTO {
  error: string;
  missing?: ValidationError;
  statusCode?: number;
}

export interface SuccessResponseDTO<T> {
  data: T;
  message?: string;
  statusCode?: number;
}

export const createValidationError = (
  missingFields: ValidationError,
): ErrorResponseDTO => ({
  error: "All fields are required",
  missing: missingFields,
  statusCode: 400,
});

export const createErrorResponse = (
  message: string,
  statusCode: number = 500,
): ErrorResponseDTO => ({
  error: message,
  statusCode,
});
