const Catigory = require("../models/catigory_model");
const catchError = require("../utility/catchError");
const apiFeatures = require("../utility/apiFeatures");
const AppError = require("../utility/appError");

exports.get_all_catigories = catchError(async (req, res, next) => {
  const features = new apiFeatures(Catigory.find(), req.query)
    .filter()
    .sort()
    .fields()
    .pagination();
  const catigories = await features.query;

  res.status(200).json({
    state: "success",
    data: catigories,
  });
});

exports.create_catigory = catchError(async (req, res) => {
  const catigory = await Catigory.create(req.body);
  res.status(201).json({
    state: "catigory created success",
    catigory,
  });
});

exports.update_catigory = catchError(async (req, res, next) => {
  // console.log(req.params);
  const catigory = await Catigory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  console.log(catigory);
  if (!catigory) {
    return next(new AppError("invalid id ", 404));
  }
  res.status(200).json({
    state: "success",
    catigory,
  });
});

exports.detelte_catigory = catchError(async (req, res, next) => {
  const catigory = await Catigory.findByIdAndDelete(req.params.id);
  if (!catigory) {
    return next(new AppError("invalid id ", 404));
  }
  res.status(200).json({
    state: "success",
    catigory,
  });
});
