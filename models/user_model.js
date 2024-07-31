const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const user_schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: [true, "this account already exist"],
      lowercase: true,
      trim: true,
      required: [true, "email is required"],
      validate: [validator.isEmail, "this is not valid email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: 6,
      select: false,
    },
    image: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/supermarket-1e36c.appspot.com/o/users%2Fdefualt.png?alt=media&token=56b87cad-4f6b-4db2-a159-e117b2adc9dc",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    resetToken: String,
    resetTokenExpire: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

user_schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

user_schema.methods = {
  compare_pass: async function (current_pass, user_pass) {
    return await bcrypt.compare(current_pass, user_pass);
  },
  create_reset_token: function () {
    reset_token = crypto.randomBytes(32).toString("hex");
    const encrypted_token = crypto
      .createHash("sha256")
      .update(reset_token)
      .digest("hex");
    this.resetToken = encrypted_token;
    this.resetTokenExpire = Date.now() + 3600000;
    return reset_token;
  },
};

const User = mongoose.model("User", user_schema);
module.exports = User;
