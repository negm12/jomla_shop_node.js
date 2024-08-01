<<<<<<< HEAD
const mongoose = require("mongoose");

const catigory_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "catigory name is required"],
      unique: [true, "this catigory already exist"],
    },
    image: {
      type: String,
      required: [true, "catigory image is required "],
    },
    products_count: { type: Number, default: 0 },
    products_price: { type: Number, default: 0 },
    // {
    //   type: mongoose.Schema.ObjectId,

    // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// catigory_schema.virtual("product_count").get(function () {
//   return "test";
// });
catigory_schema.virtual("products", {
  ref: "Product",
  foreignField: "catigory",
  localField: "_id",
});

// catigory_schema.pre(/^find/, function (next) {
//   this.populate("products");
//   next();
// });

const Catigory = mongoose.model("Catigorie", catigory_schema);
module.exports = Catigory;
=======
const mongoose = require("mongoose");

const catigory_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "catigory name is required"],
      unique: [true, "this catigory already exist"],
    },
    image: {
      type: String,
      required: [true, "catigory image is required "],
    },
    products_count: { type: Number, default: 0 },
    products_price: { type: Number, default: 0 },
    // {
    //   type: mongoose.Schema.ObjectId,

    // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// catigory_schema.virtual("product_count").get(function () {
//   return "test";
// });
catigory_schema.virtual("products", {
  ref: "Product",
  foreignField: "catigory",
  localField: "_id",
});

// catigory_schema.pre(/^find/, function (next) {
//   this.populate("products");
//   next();
// });

const Catigory = mongoose.model("Catigorie", catigory_schema);
module.exports = Catigory;
>>>>>>> 0212859 (first commit)
