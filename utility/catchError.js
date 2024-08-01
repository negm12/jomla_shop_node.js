<<<<<<< HEAD
const catchError = (cb) => {
  return (req, res, next) => {
    cb(req, res, next).catch((err) => next(err));
  };
};
module.exports = catchError;
=======
const catchError = (cb) => {
  return (req, res, next) => {
    cb(req, res, next).catch((err) => next(err));
  };
};
module.exports = catchError;
>>>>>>> 0212859 (first commit)
