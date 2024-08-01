<<<<<<< HEAD
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AppError = require("./utility/appError");
const error_controller = require("./controllers/error_controller");
const catigory_router = require("./routes/catigory_router");
const product_router = require("./routes/product_router");
const product_item_router = require("./routes/product_item_router");
const auth_router = require("./routes/auth_router");
const orders_router = require("./routes/orders_router");
const review_router = require("./routes/review_router");
const compression = require("compression");
// const serverless = require("serverless-http");

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  optionsSuccessStatus: 200,
  credentials: true,
};
dotenv.config({ path: `${__dirname}/config.env` });
const app = express();
// app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(cors(corsOptions));
app.use(cors());
app.use(express.static(`${__dirname}/public`));

app.use("/api/shop/catigory", catigory_router);
app.use("/api/shop/products", product_router);
app.use("/api/shop/product_item", product_item_router);
app.use("/api/shop/auth", auth_router);
app.use("/api/shop/orders", orders_router);
app.use("/api/shop/reviews", review_router);

// handl undefined url

// app.use((req, res, next) => {
//   // next(new AppError("page not found", 404));
//   console.log(req.cookies);
//   next();
// });
const router = express.Router();
app.use(compression());
// app.use("/.netlify/functions/app", router);
// module.exports.handler = serverless(app);

app.use("*", (req, res, next) => {
  next(new AppError("page not found", 404));
});

// error middleware
app.use(error_controller);

module.exports = app;
=======
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AppError = require("./utility/appError");
const error_controller = require("./controllers/error_controller");
const catigory_router = require("./routes/catigory_router");
const product_router = require("./routes/product_router");
const product_item_router = require("./routes/product_item_router");
const auth_router = require("./routes/auth_router");
const orders_router = require("./routes/orders_router");
const review_router = require("./routes/review_router");
const compression = require("compression");
// const serverless = require("serverless-http");

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  optionsSuccessStatus: 200,
  credentials: true,
};
dotenv.config({ path: `${__dirname}/config.env` });
const app = express();
// app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(cors(corsOptions));
app.use(cors());
app.use(express.static(`${__dirname}/public`));

app.use("/api/shop/catigory", catigory_router);
app.use("/api/shop/products", product_router);
app.use("/api/shop/product_item", product_item_router);
app.use("/api/shop/auth", auth_router);
app.use("/api/shop/orders", orders_router);
app.use("/api/shop/reviews", review_router);

// handl undefined url

// app.use((req, res, next) => {
//   // next(new AppError("page not found", 404));
//   console.log(req.cookies);
//   next();
// });
const router = express.Router();
app.use(compression());
// app.use("/.netlify/functions/app", router);
// module.exports.handler = serverless(app);

app.use("*", (req, res, next) => {
  next(new AppError("page not found", 404));
});

// error middleware
app.use(error_controller);

module.exports = app;
>>>>>>> 0212859 (first commit)
