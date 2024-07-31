const Order = require("../models/orders_model");
const catchError = require("../utility/catchError");
const AppError = require("../utility/appError");
const ApiFeatures = require("../utility/apiFeatures");
const Product_item = require("../models/product_item_model");

exports.get_new_orders = catchError(async (req, res, next) => {
  req.query.state = "pending";
  const features = new ApiFeatures(Order.find(), req.query)
    .filter()
    .sort()
    .pagination();
  const orders = await features.query;
  res.status(200).json({
    state: "success",
    orders,
  });
});

exports.get_all_orders = catchError(async (req, res, next) => {
  // console.log(req.query);
  const features = new ApiFeatures(Order.find(), req.query)
    .filter()
    .sort()
    .pagination();
  const orders = await features.query;
  res.status(200).json({
    state: "success",
    orders,
  });
});

exports.reject_order = catchError(async (req, res, next) => {
  // update  order state to rejected
  // desable the action btn in admin and user
  // re store the order in its place again  (patch the products add the size qty to this product )
  // console.log(req.params.id);
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { ...req.body, state: "rejected" },
    {
      new: true,
      runValidators: true,
    }
  );
  const product = await Product_item.findOne({ color: order.color });
  const sizes = product.sizes;
  sizes.forEach((size) => {
    if (size.size === order.size) size.quantity += order.quantity;
  });
  product.sizes = sizes;
  await product.save({ runValidators: false });
  // console.log(sizes, product.sizes);

  if (!order)
    return next(
      new AppError("this order does not exist may be deletet by the user", 401)
    );
  res.status(201).json({
    state: "success",
    order,
  });
});
exports.accept_order = catchError(async (req, res, next) => {
  // update  order state to accepted
  // desable the action btn in admin and user
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { state: "accepted" },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!order)
    return next(
      new AppError("this order does not exist may be deletet by the user", 401)
    );
  res.status(201).json({
    state: "success",
    order,
  });
});

//  user side

exports.create_order = catchError(async (req, res, next) => {
  // orders can be more than on or array of orders model.ivserMany(array)
  const orders = await Order.insertMany(req.body);

  res.status(200).json({
    state: "success",
    orders,
  });
});

// exports.update_order = catchError(async (req, res, next) => {
//   // user can update order if only the order satet does not changed (pending only)

// });
// exports.delete_order = catchError(async (req, res, next) => {
//   // user can delete order if only the order satet does not changed (pending only)
// });

exports.orders_stats = catchError(async (req, res, next) => {
  const stats = await Order.aggregate([
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
