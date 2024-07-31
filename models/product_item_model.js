const mongoose = require("mongoose");
const Product = require("./product_model");

const product_item_schema = new mongoose.Schema({
  color: {
    type: String,
    required: [true, "please select product color"],
  },
  sizes: {
    type: [{ size: String, quantity: Number }],
    // required: [true, "product size is required"],
    // enum: ["s", "m", "xl", "2xl", "3xl"],
    default: [{ size: "s", quantity: 0 }],
  },
  // [
  //   {
  //     size: String,
  //     quantity: Number,
  //     // enum: ["s", "m", "xl", "2xl", "3xl"],
  //   },
  // ],
  // quantity: {
  //   type: Number,
  //   default: 1,
  // },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  images: {
    type: [String],
    required: [true, "you must select images for product at least one image "],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "product item must belong to specefic product"],
  },
});

// product_item_schema.pre(/^find/, function (next) {
//   this.populate("product");
//   next();
// });

const Product_item = mongoose.model("Product_item", product_item_schema);
module.exports = Product_item;
