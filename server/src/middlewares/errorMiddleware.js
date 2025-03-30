const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Log error for debugging
  
    const statusCode = err.statusCode || 500; // Default to 500 if no status provided
    const message = err.message || "Internal Server Error";
  
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
  
  export default errorMiddleware;
  