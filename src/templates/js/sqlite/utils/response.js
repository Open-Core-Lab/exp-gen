export const successResponse = (data, message = "Success") => ({
  status: 200,
  success: true,
  message,
  data,
});

export const errorResponse = (error, message = "Error") => ({
  status: error.status || 500,
  success: false,
  message,
  error: error.message || message,
});
