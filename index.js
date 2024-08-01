<<<<<<< HEAD
const http = require("http");

const app = require("./app");

const server = http.createServer(app);
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const port = process.env.PORT || 8000;

const DB = process.env.DB_KEY.replace("<PASSWORD>", process.env.DB_PASS);
mongoose
  .connect(DB)
  .then((con) => console.log("database connected"))
  .catch((err) => {
    console.log("err db connection", err);
  });

// console.log("after");
const io = new Server(server);
io.on("connection", (soket) => console.log("soket", soket));

server.listen(port, () => {
  console.log(`server start on port ${port}`);
});
=======
const http = require("http");

const app = require("./app");

const server = http.createServer(app);
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const port = process.env.PORT || 8000;

const DB = process.env.DB_KEY.replace("<PASSWORD>", process.env.DB_PASS);
mongoose
  .connect(DB)
  .then((con) => console.log("database connected"))
  .catch((err) => {
    console.log("err db connection", err);
  });

// console.log("after");
const io = new Server(server);
io.on("connection", (soket) => console.log("soket", soket));

server.listen(port, () => {
  console.log(`server start on port ${port}`);
});
>>>>>>> 0212859 (first commit)
