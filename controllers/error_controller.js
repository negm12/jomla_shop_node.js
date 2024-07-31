const AppError = require("../utility/appError");

const handle_invalidId = (err) => {
  return new AppError(`invalid ${err.path} : ${err.value}`, 400);
};

const handle_duplicate_key = (err) => {
  return new AppError("duplicate value ", 400);
};

handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  // console.log(errors);
  return new AppError(`${errors.join(" / ")}`, 400);
};

handleJwtError = (err) => {
  return new AppError("the token is invalid pls login again", 401);
};
handleJwtExpire = (err) => {
  return new AppError("the token is expired pls login again ", 401);
};

const handle_development_error = (err, res) => {
  console.log(err);
  res.status(err.statusCode).json({
    state: err.state,
    message: err.message,
    code: err.code,
    stack: err.stack,
    err,
  });
};

const handle_production_error = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      state: err.state,
      message: err.message,
    });
  } else {
    // console.log(err);
    res.status(err.statusCode).json({
      state: err.state,
      message: "somthing may be error ",
    });
  }
};

const handle_error = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.state = err.state || "error";
  if (process.env.NODE_ENV === "development") {
    handle_development_error(err, res);
  }

  if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") err = handle_invalidId(err);
    if (err.code === 11000) err = handle_duplicate_key(err);
    if (err.name === "ValidationError") err = handleValidationError(err);
    if (err.name === "JsonWebTokenError") err = handleJwtError(err);
    if (err.name === "TokenExpiredError") err = handleJwtExpire(err);
    handle_production_error(err, res);
  }
};

module.exports = handle_error;
