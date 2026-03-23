import type { HttpError } from "http-errors";

export const successResponse = <T>(data: T, message: string = "Success") => ({
  status: 200,
  success: true,
  message,
  data,
});

export const errorResponse = (
  error?: HttpError | null,
  message: string = "Error"
) => ({
  status: error?.status || 500,
  success: false,
  message,
  error: error?.message || message,
});
