// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace for debugging

  // Determine the status code and message based on the error
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Send the error response
  res.status(statusCode).json({
    error: {
      message: message,
      // Optionally include the stack trace in development
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    },
  });
};
