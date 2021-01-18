const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const server = express();
// const userRouter = require("./routes/user_router")
const BooksRouter = require("./routes/books_router");
const authRouter = require("./auth/auth-router");
const clubRouter = require("./routes/club_router");

server.use(morgan("combined"));
server.use(express.json());
server.use(cors());
server.use(cookieParser());

server.use("/api/auth", authRouter);
server.use("/api/books", BooksRouter);
server.use("/api/clubs", clubRouter);
// server.use("/api/", userRouter) /
server.listen(2500, () => console.log("Server Running on 5600"));
server.get("/test", (req, res) => {
  res.status(200);
  res.send("<h1>Server Status</h1><h2>Server running succesfully.</h2>");
});
