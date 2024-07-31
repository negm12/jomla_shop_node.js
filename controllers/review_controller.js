const Review = require("../models/review_model");
const ApiFeatures = require("../utility/apiFeatures");
const catchError = require("../utility/catchError");
const AppError = require("../utility/appError");

// exports.get_all_reviews = catchError(async (req, res, next) => {
//   const reviews = await Review.find();
//   res.status(200).json({
//     state: "success",
//     reviews,
//   });
// });

exports.get_product_reviews = catchError(async (req, res, next) => {
  const features = new ApiFeatures(Review.find(), req.query).filter();
  const reviews = await features.query;
  res.status(200).json({
    state: "success",
    reviews,
  });
});

exports.create_review = catchError(async (req, res, next) => {
  const review = await Review.create(req.body);
  res.status(201).json({
    state: "success",
    review,
  });
});

exports.delete_review = catchError(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  // if(!review) return next(new AppError(''))
  res.status(201).json({
    state: "success",
    review,
  });
});

exports.update_review = catchError(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  // if(!review) return next(new AppError(''))
  res.status(201).json({
    state: "success",
    review,
  });
});
