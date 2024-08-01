<<<<<<< HEAD
const mongoose = require("mongoose");

const orders_schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    sale: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      enum: ["pending", "rejected", "accepted", "done"],
      default: "pending",
    },
  },
  {
    toJSON: { virtual: true },
    toObject: { virtual: true },
  }
);

orders_schema.virtual("total_price").get(function () {
  return (this.price - this.sale) * this.quantity;
});

orders_schema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-_id",
  }).populate({
    path: "product_id",
  });
  next();
});
const Order = mongoose.model("Oredr", orders_schema);
module.exports = Order;
=======
const mongoose = require("mongoose");

const orders_schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    sale: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      enum: ["pending", "rejected", "accepted", "done"],
      default: "pending",
    },
  },
  {
    toJSON: { virtual: true },
    toObject: { virtual: true },
  }
);

orders_schema.virtual("total_price").get(function () {
  return (this.price - this.sale) * this.quantity;
});

orders_schema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-_id",
  }).populate({
    path: "product_id",
  });
  next();
});
const Order = mongoose.model("Oredr", orders_schema);
module.exports = Order;
>>>>>>> 0212859 (first commit)
