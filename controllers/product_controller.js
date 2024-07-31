const Product = require("../models/product_model");
const catchError = require("../utility/catchError");
const ApiFeatures = require("../utility/apiFeatures");
const AppError = require("../utility/appError");

exports.get_all_products = catchError(async (req, res, next) => {
  // console.log(req.query);
  const features = new ApiFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .fields()
    .pagination();
  const products = await features.query.populate("catigory");
  res.status(200).json({
    state: "success",
    products,
  });
});

exports.create_product = catchError(async (req, res, next) => {
  // console.log(req.body);
  const product = await Product.create(req.body);
  res.status(201).json({
    state: "success",
    product,
  });
});

exports.get_product = catchError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new AppError("invalid id ", 404));
  res.status(200).json({
    state: "success",
    product,
  });
});

exports.update_product = catchError(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) return next(new AppError("invalid id ", 404));
  res.status(200).json({
    state: "success",
    product,
  });
});

exports.delete_product = catchError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return next(new AppError("invalid id ", 404));
  res.status(200).json({
    state: "deleted success",
  });
});

exports.products_stats = catchError(async (req, res, next) => {
  const stats = await Product.aggregate([
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        price: { $sum: "$price" },
      },
    },
  ]);
  res.status(200).json({
    state: "success",
    stats,
  });
});
