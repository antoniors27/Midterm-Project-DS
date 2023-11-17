// middlewares/errorHandler.js
const errorMessages = require("../utils/errorMessages");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let status;
  let message;

  switch (err.message) {
    case errorMessages.employeeNotFound():
      status = 404;
      message = err.message;
      break;
    default:
      status = 500;
      message = "Internal Server Error";
      break;
  }

  res.status(status).json({
    success: false,
    message: message,
    data: null,
    error: err.message,
  });
};

module.exports = errorHandler;
