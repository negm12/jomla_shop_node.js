<<<<<<< HEAD
const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");

const catchError = require("../utility/catchError");
const AppError = require("../utility/appError");
const SendEmail = require("../utility/sendEmail");

const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const send_res = (user, res, status_code) => {
  const cookie_option = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 3600 * 1000
    ),
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  };
  if (process.env.NODE_ENV === "production") cookie_option.secure = true;

  const token = createToken({ id: user._id });
  res.cookie("jwt", token, cookie_option);

  res.status(status_code).json({
    state: "success",
    user,
    token,
  });
};

// test
exports.get_all_users = catchError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    state: "success",
    users,
  });
});

exports.signIn = catchError(async (req, res, next) => {
  const user = await User.create(req.body);

  send_res(user, res, 200);
});

exports.create_admin = catchError(async (req, res, next) => {
  const admin = await User.create({ ...req.body, role: "admin" });
  res.status(200).json({
    state: "success",
    admin,
  });
});

exports.login = catchError(async (req, res, next) => {
  // get email and pass from body and ckeck if has value or not
  // find user by email
  // compare user pass by the current pass from body
  // if ok login and send token to the user
  const { email, password } = req.body;
  // console.log(req.cookies);

  if (!email || !password)
    return next(new AppError("invalid email or password ", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.compare_pass(password, user.password)))
    return next(new AppError("email or password is incorrect ", 400));

  send_res(user, res, 200);
  // console.log(user);
});

exports.protect_route = catchError(async (req, res, next) => {
  // get auth  header from req.headers this is hold the toke
  // verify the toke this will return the payload
  // find the user by the payload
  // if user next()
  // then set req.user = user
  // console.log(req.headers);

  let token;
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  )
    return next(
      new AppError("you are not loged in please login or signin and try again")
    );

  token = req.headers.authorization.split(" ")[1];
  const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(payload.id);
  const user = await User.findById(payload.id);
  // console.log(user);
  if (!user) return next(new AppError("this email dos not exist", 404));

  req.user = user;
  next();
});

exports.check_roles = (...roles) => {
  if (!roles.includes(req.user.role))
    return next(new AppError("you are not have access to this route", 401));

  next();
};

exports.forgot_password = catchError(async (req, res, next) => {
  // get the user by email and check if have account or not
  // create reset token and reset token expire and save on db
  // send the reset token as email to the user
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return next(
      new AppError("you are not have an account for this email", 404)
    );

  const resetToken = user.create_reset_token();
  user.save({ validateBeforeSave: false });
  // console.log(user);

  const url = `${req.protocol}://${req.get(
    "host"
  )}/reset_password/${resetToken}`;
  // if(user.role === 'admin'){
  //   url =
  // }
  try {
    new SendEmail(url, resetToken, user).Sendmail();
    res.status(200).json({
      state: "success",
      message: "check your email to reset your password",
    });
  } catch (err) {
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    user.save({ validateBeforeSave: false });
    return next(new AppError("an error has occured please try again", 500));
  }
});

exports.reset_password = catchError(async (req, res, next) => {
  // get the token from query or params
  // find user by this token and expire time is greater the date.now
  // get the password from body
  // update the current pass with new one
  // save changes
  // reset resettoke and sxpire
  const { token } = req.params;
  // console.log(token);
  const encrypted_token = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetToken: encrypted_token,
    resetTokenExpire: { $gt: Date.now() },
  });

  // console.log(user);
  if (!user)
    return next(new AppError("this email is expired please tyr again", 404));

  user.password = req.body.password;
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;
  await user.save();
  send_res(user, res, 201);
});

exports.update_password = catchError(async (req, res, next) => {
  // get the current pass
  //
  const user = await User.findById(req.user._id).select("+password");
  // console.log(user);

  if (!user)
    return next(
      new AppError("you are not loged in please log in and try again ", 404)
    );

  if (!(await user.compare_pass(req.body.currentPassword, user.password)))
    return next(new AppError("current password in wrong ", 401));

  user.password = req.body.password;
  await user.save();
  send_res(user, res, 201);
});

exports.update_me = catchError(async (req, res, next) => {
  // must be auth
  // f name , l name , image
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    state: "success",
    user,
  });
});

exports.user_count = catchError(async (req, res, next) => {
  const count = await User.aggregate([
    {
      $group: {
        _id: null,
        user_count: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    state: "success",
    count,
  });
});
=======
const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");

const catchError = require("../utility/catchError");
const AppError = require("../utility/appError");
const SendEmail = require("../utility/sendEmail");

const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const send_res = (user, res, status_code) => {
  const cookie_option = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 3600 * 1000
    ),
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  };
  if (process.env.NODE_ENV === "production") cookie_option.secure = true;

  const token = createToken({ id: user._id });
  res.cookie("jwt", token, cookie_option);

  res.status(status_code).json({
    state: "success",
    user,
    token,
  });
};

// test
exports.get_all_users = catchError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    state: "success",
    users,
  });
});

exports.signIn = catchError(async (req, res, next) => {
  const user = await User.create(req.body);

  send_res(user, res, 200);
});

exports.create_admin = catchError(async (req, res, next) => {
  const admin = await User.create({ ...req.body, role: "admin" });
  res.status(200).json({
    state: "success",
    admin,
  });
});

exports.login = catchError(async (req, res, next) => {
  // get email and pass from body and ckeck if has value or not
  // find user by email
  // compare user pass by the current pass from body
  // if ok login and send token to the user
  const { email, password } = req.body;
  // console.log(req.cookies);

  if (!email || !password)
    return next(new AppError("invalid email or password ", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.compare_pass(password, user.password)))
    return next(new AppError("email or password is incorrect ", 400));

  send_res(user, res, 200);
  // console.log(user);
});

exports.protect_route = catchError(async (req, res, next) => {
  // get auth  header from req.headers this is hold the toke
  // verify the toke this will return the payload
  // find the user by the payload
  // if user next()
  // then set req.user = user
  // console.log(req.headers);

  let token;
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  )
    return next(
      new AppError("you are not loged in please login or signin and try again")
    );

  token = req.headers.authorization.split(" ")[1];
  const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(payload.id);
  const user = await User.findById(payload.id);
  // console.log(user);
  if (!user) return next(new AppError("this email dos not exist", 404));

  req.user = user;
  next();
});

exports.check_roles = (...roles) => {
  if (!roles.includes(req.user.role))
    return next(new AppError("you are not have access to this route", 401));

  next();
};

exports.forgot_password = catchError(async (req, res, next) => {
  // get the user by email and check if have account or not
  // create reset token and reset token expire and save on db
  // send the reset token as email to the user
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return next(
      new AppError("you are not have an account for this email", 404)
    );

  const resetToken = user.create_reset_token();
  user.save({ validateBeforeSave: false });
  // console.log(user);

  const url = `${req.protocol}://${req.get(
    "host"
  )}/reset_password/${resetToken}`;
  // if(user.role === 'admin'){
  //   url =
  // }
  try {
    new SendEmail(url, resetToken, user).Sendmail();
    res.status(200).json({
      state: "success",
      message: "check your email to reset your password",
    });
  } catch (err) {
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    user.save({ validateBeforeSave: false });
    return next(new AppError("an error has occured please try again", 500));
  }
});

exports.reset_password = catchError(async (req, res, next) => {
  // get the token from query or params
  // find user by this token and expire time is greater the date.now
  // get the password from body
  // update the current pass with new one
  // save changes
  // reset resettoke and sxpire
  const { token } = req.params;
  // console.log(token);
  const encrypted_token = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetToken: encrypted_token,
    resetTokenExpire: { $gt: Date.now() },
  });

  // console.log(user);
  if (!user)
    return next(new AppError("this email is expired please tyr again", 404));

  user.password = req.body.password;
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;
  await user.save();
  send_res(user, res, 201);
});

exports.update_password = catchError(async (req, res, next) => {
  // get the current pass
  //
  const user = await User.findById(req.user._id).select("+password");
  // console.log(user);

  if (!user)
    return next(
      new AppError("you are not loged in please log in and try again ", 404)
    );

  if (!(await user.compare_pass(req.body.currentPassword, user.password)))
    return next(new AppError("current password in wrong ", 401));

  user.password = req.body.password;
  await user.save();
  send_res(user, res, 201);
});

exports.update_me = catchError(async (req, res, next) => {
  // must be auth
  // f name , l name , image
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    state: "success",
    user,
  });
});

exports.user_count = catchError(async (req, res, next) => {
  const count = await User.aggregate([
    {
      $group: {
        _id: null,
        user_count: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    state: "success",
    count,
  });
});
>>>>>>> 0212859 (first commit)
