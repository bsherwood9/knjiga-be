const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users_model");

router.post("/register", (req, res) => {
  const user = req.body;
  const salt = bcrypt.genSaltSync(10);
  // Hash Password
  const hash = bcrypt.hashSync(user.password, salt);
  console.log("this is the hash", hash);
  console.log(user);
  user.password = hash;
  Users.addUser(user)
    .then((data) => {
      res.status(201).json({ message: "You've registered!", data });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ errorMessage: "There was an error registering.", err })
    );
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  console.log(req.body, username);
  //   console.log(Users.findBy(username));
  Users.findBy(username)
    .then((user) => {
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        //   //creating a token
        const token = generateToken(user);
        return res.status(200).json({
          message: `Welcome to Knjiga ${user.username}.`,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "there was an error", err })
    );
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "7h",
  };
  return jwt.sign(payload, process.env.MY_SECRET, options);
}
module.exports = router;
