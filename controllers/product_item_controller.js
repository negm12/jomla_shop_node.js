const Product_item = require("../models/product_item_model");
const catchError = require("../utility/catchError");
const AppError = require("../utility/appError");
const ApiFeatures = require("../utility/apiFeatures");

exports.get_all_product_items = catchError(async (req, res, next) => {
  const features = new ApiFeatures(Product_item.find(), req.query)
    .filter()
    .sort()
    .fields()
    .pagination();
  const product_items = await features.query;
  res.status(200).json({
    state: "success",
    product_items,
  });
});

exports.create_product_item = catchError(async (req, res, next) => {
  const new_item = req.body;
  // console.log(new_item);
  const check_if_exist = await Product_item.findOne({
    color: new_item.color,
    product: new_item.product,
  });
  if (check_if_exist) {
    res.status(400).json({
      state: "error",
      message: "this product is already exist ",
      // check_if_exist,
    });
  } else {
    const product_item = await Product_item.create(req.body);
    res.status(201).json({
      state: "success",
      product_item,
    });
  }
});

exports.get_product_item = catchError(async (req, res, next) => {
  const product_item = await Product_item.findById(req.params.product_id);
  if (!product_item) return next(new AppError("invalid id", 404));

  res.status(200).json({
    state: "success",
    product_item,
  });
});

exports.update_product_item = catchError(async (req, res, next) => {
  const product_item = await Product_item.findByIdAndUpdate(
    req.params.product_id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!product_item) return next(new AppError("invalid id", 404));

  res.status(200).json({
    state: "success",
    product_item,
  });
});

exports.delete_product_item = catchError(async (req, res, next) => {
  const product_item = await Product_item.findByIdAndDelete(
    req.params.product_id
  );
  if (!product_item) return next(new AppError("invalid id", 404));
  res.status(200).json({
    state: "success",
    product_item,
  });
});

//

//

exports.add_size = catchError(async (req, res, next) => {
  let product_item;
  for (el of req.body) {
    product_item = await Product_item.findOneAndUpdate(
      {
        _id: req.params.product_id,
        "sizes.size": el.size,
      },
      {
        $set: {
          "sizes.$": el,
        },
      },
      { new: true, runValidators: true }
    );
    if (!product_item) {
      product_item = await Product_item.findByIdAndUpdate(
        req.params.product_id,
        {
          $push: { sizes: el },
        },
        { new: true }
      );
    }
  }
  if (!product_item) return next(new AppError("invalid id ", 404));
  res.status(200).json({
    state: "success",
    product_item,
  });
});

exports.update_size = catchError(async (req, res, next) => {
  req.body._id = req.params.size_id;
  const product_item = await Product_item.findOneAndUpdate(
    { "sizes._id": req.params.size_id },
    { $set: { "sizes.$": req.body } },
    { new: true, runValidators: true }
  );
  if (!product_item) return next(new AppError("invalid id", 404));
  res.status(200).json({
    state: "success",
    product_item,
  });
});

exports.delete_size = catchError(async (req, res, next) => {
  const product_item = await Product_item.findOneAndUpdate(
    { "sizes._id": req.params.size_id },
    { $pull: { sizes: { _id: req.params.size_id } } },
    { new: true, runValidators: true }
  );
  if (!product_item) return next(new AppError("invalid id", 404));
  res.status(200).json({
    state: "success",
    product_item,
  });
});
