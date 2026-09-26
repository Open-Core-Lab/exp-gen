export const successResponse = (data: any = {}, message = "Success") => ({
  success: true,
  message,
  data,
});

export const errorResponse = (error: any = {}, message = "Error") => ({
  success: false,
  message,
  error,
});
