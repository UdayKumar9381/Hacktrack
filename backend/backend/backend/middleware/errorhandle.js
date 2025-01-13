module.exports = (err, req, res, next) => {
  // Log the full error stack to the server for debugging
  console.error(err.stack);

  // Check if the error has a status code and message
  if (err.status) {
    // Handle known errors with custom status codes and messages
    res.status(err.status).json({
      message: err.message || 'An unexpected error occurred.',
    });
  } else {
    // Generic server error handling for unknown errors
    res.status(500).json({
      message: 'Something went wrong!',
      error: err.message || 'Unknown server error', // Optionally send the error message in dev mode
    });
  }
};
