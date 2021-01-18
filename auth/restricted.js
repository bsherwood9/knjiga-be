const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //reading the token from cookies!
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.MY_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(400).json({
          message: "There was an authorization error processing your request.",
          err,
        });
      } else {
        // console.log("request", req);
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res
      .status(500)
      .json({ message: "There was an error processing your request." });
  }
};
