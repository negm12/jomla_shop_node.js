<<<<<<< HEAD
const mongoose = require("mongoose");
const Product = require("../models/product_model");

const review_schema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  public: String,
});

review_schema.pre(/^find/, function (next) {
  this.populate("user");
  next();
});

review_schema.statics.calc_avg_rating = async function (product_id) {
  const stats = await this.aggregate([
    {
      $match: { product: product_id },
    },
    {
      $group: {
        _id: "$product",
        rating_count: { $sum: 1 },
        rating_avg: { $avg: "$rating" },
      },
    },
  ]);
  console.log(stats);
  await Product.findByIdAndUpdate(product_id, {
    ratingAvg: stats[0].rating_avg,
    ratingQty: stats[0].rating_count,
  });
};

review_schema.post("save", function () {
  this.constructor.calc_avg_rating(this.product);
});

const Review = mongoose.model("Review", review_schema);
module.exports = Review;
=======
const mongoose = require("mongoose");
const Product = require("../models/product_model");

const review_schema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  public: String,
});

review_schema.pre(/^find/, function (next) {
  this.populate("user");
  next();
});

review_schema.statics.calc_avg_rating = async function (product_id) {
  const stats = await this.aggregate([
    {
      $match: { product: product_id },
    },
    {
      $group: {
        _id: "$product",
        rating_count: { $sum: 1 },
        rating_avg: { $avg: "$rating" },
      },
    },
  ]);
  console.log(stats);
  await Product.findByIdAndUpdate(product_id, {
    ratingAvg: stats[0].rating_avg,
    ratingQty: stats[0].rating_count,
  });
};

review_schema.post("save", function () {
  this.constructor.calc_avg_rating(this.product);
});

const Review = mongoose.model("Review", review_schema);
module.exports = Review;
>>>>>>> 0212859 (first commit)
