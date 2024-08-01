<<<<<<< HEAD
const mongoose = require("mongoose");
const Catigory = require("./catigory_model");
const Product_item = require("./product_item_model");
// const Product_item = require("./product_item_model");

const product_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required "],
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "product name is required "],
    },
    sale: {
      type: Number,
      default: 0,
      // validate: {
      //   validator: function (val) {
      //     return val < this.price;
      //   },
      //   message: "product sale must be less than product price ",
      // },
    },
    brand: {
      type: String,
      required: [true, "brand is required"],
      lowercase: true,
    },
    createdAt: {
      type: Date,
      default: new Date().toISOString(),
    },
    catigory: {
      type: mongoose.Schema.ObjectId,
      ref: "Catigorie",
      required: true,
    },
    ratingAvg: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    ratingQty: {
      type: Number,
      default: 0,
    },
    // reviews: [String],
    // productItems: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Product_item",
    //   },
    // ],
    description: {
      type: String,
      required: [true, "product description is required"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

product_schema.virtual("productItems", {
  ref: "Product_item",
  foreignField: "product",
  localField: "_id",
});

product_schema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

product_schema.statics.calc_products_count_and_price = async function (cat_id) {
  const stats = await this.aggregate([
    {
      $match: { catigory: cat_id },
    },
    {
      $group: {
        _id: "$catigory",
        products_count: { $sum: 1 },
        products_price: { $sum: "$price" },
      },
    },
  ]);
  // console.log(stats);
  await Catigory.findByIdAndUpdate(cat_id, {
    products_count: stats[0].products_count,
    products_price: stats[0].products_price,
  });
};

product_schema.post("save", function () {
  this.constructor.calc_products_count_and_price(this.catigory);
});

product_schema.pre(/^find/, function (next) {
  this.populate({
    path: "catigory",
    select: "-__v",
  });
  this.populate({
    path: "productItems",
    select: "-__v",
  });
  this.populate("reviews");
  next();
});

product_schema.virtual("cat").get(function () {
  return this.catigory._id;
});

const Product = mongoose.model("Product", product_schema);
module.exports = Product;
=======
const mongoose = require("mongoose");
const Catigory = require("./catigory_model");
const Product_item = require("./product_item_model");
// const Product_item = require("./product_item_model");

const product_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required "],
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "product name is required "],
    },
    sale: {
      type: Number,
      default: 0,
      // validate: {
      //   validator: function (val) {
      //     return val < this.price;
      //   },
      //   message: "product sale must be less than product price ",
      // },
    },
    brand: {
      type: String,
      required: [true, "brand is required"],
      lowercase: true,
    },
    createdAt: {
      type: Date,
      default: new Date().toISOString(),
    },
    catigory: {
      type: mongoose.Schema.ObjectId,
      ref: "Catigorie",
      required: true,
    },
    ratingAvg: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    ratingQty: {
      type: Number,
      default: 0,
    },
    // reviews: [String],
    // productItems: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Product_item",
    //   },
    // ],
    description: {
      type: String,
      required: [true, "product description is required"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

product_schema.virtual("productItems", {
  ref: "Product_item",
  foreignField: "product",
  localField: "_id",
});

product_schema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

product_schema.statics.calc_products_count_and_price = async function (cat_id) {
  const stats = await this.aggregate([
    {
      $match: { catigory: cat_id },
    },
    {
      $group: {
        _id: "$catigory",
        products_count: { $sum: 1 },
        products_price: { $sum: "$price" },
      },
    },
  ]);
  // console.log(stats);
  await Catigory.findByIdAndUpdate(cat_id, {
    products_count: stats[0].products_count,
    products_price: stats[0].products_price,
  });
};

product_schema.post("save", function () {
  this.constructor.calc_products_count_and_price(this.catigory);
});

product_schema.pre(/^find/, function (next) {
  this.populate({
    path: "catigory",
    select: "-__v",
  });
  this.populate({
    path: "productItems",
    select: "-__v",
  });
  this.populate("reviews");
  next();
});

product_schema.virtual("cat").get(function () {
  return this.catigory._id;
});

const Product = mongoose.model("Product", product_schema);
module.exports = Product;
>>>>>>> 0212859 (first commit)
