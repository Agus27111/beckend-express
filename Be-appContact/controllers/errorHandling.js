const logger = require("../middleware/winston");

const errorHandling = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  // Handling Joi validation errors
  if (err.isJoi) {
    statusCode = 400;
    message = err.details.map((detail) => detail.message).join(", ");
    logger.warn(`Validation Error: ${message}`);
  } else if (err.statusCode) {
    // Handling other custom errors with specific status codes
    statusCode = err.statusCode;
    message = err.message;
    logger.warn(`Custom Error: ${message}`);
  } else {
    // Fallback for unexpected errors
    logger.error(`Unhandled Error: ${err.message}`);
  }

  // Log the complete error for debugging
  logger.error(err);

  // Send JSON response with error details
  res.status(statusCode).json({
    errors: [message],
    message: statusCode === 500 ? "Internal Server Error" : message,
    data: null,
  });
};

module.exports = errorHandling;
