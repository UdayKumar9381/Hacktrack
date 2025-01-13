module.exports = (err, req, res, next) => {
  // Log the full error stack to the server for debugging
  console.error(err.stack);

  // Handle specific error types (e.g., validation errors, database errors)
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: {
        message: 'Validation failed',
        details: err.errors,
      },
    });
  }

  // Check if the error has a status code and message
  if (err.status) {
    // Handle known errors with custom status codes and messages
    return res.status(err.status).json({
      error: {
        message: err.message || 'An unexpected error occurred.',
        code: err.status,
      },
    });
  }

  // Generic server error handling for unknown errors
  res.status(500).json({
    error: {
      message: err.message || 'Something went wrong!',
      code: 500,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Include stack trace in dev mode
    },
  });
};
