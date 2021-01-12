const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const server = express();
// const userRouter = require("./routes/user_router")
const User = require("./models/users_model");
const BooksRouter = require("./routes/books_router");

server.use(cors());
server.use(morgan("combined"));
server.use(express.json());

server.use("/api/books", BooksRouter);

// server.use("/api/", userRouter) /
server.listen(4100, () => console.log("Server Running on 7000"));
server.get("/test", (req, res) => {
  res.status(200);
  res.send("<h1>Server Status</h1><h2>Server running succesfully.</h2>");
});
