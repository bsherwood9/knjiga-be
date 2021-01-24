const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users_model");
const Shelves = require("../models/shelf_model");

router.post("/register", async (req, res) => {
  const user = req.body;
  const salt = bcrypt.genSaltSync(10);
  // Hash Password
  const hash = bcrypt.hashSync(user.password, salt);
  console.log("this is the hash", hash);
  console.log(user);
  user.password = hash;
  let UserInfo = Users.addUser(user)
    .then((data) => {
      res.status(201).json({ message: "You've registered!" });
      return data;
    })
    .catch((err) =>
      res
        .status(500)
        .json({ errorMessage: "There was an error registering.", err })
    );
  let shelfData = {
    title: "My Books",
    description: "A shelf for all my books.",
    user_id: UserInfo.id,
  };
  console.log(shelfData);
  // Shelves.addShelf(shelfData)
  //   .then((data) => {
  //     return data;
  //   })
  //   .catch((err) => console.log(err));
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;
  console.log(req.body);
  //   console.log(Users.findBy(username));
  Users.findBy(email)
    .then((user) => {
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        //creating a token
        const token = generateToken(user);
        //setting the token in the cookies!
        res.cookie("token", token);
        //pass options in cookie, that must be https secure=true
        //expirate
        res.cookie("user_id", user.id);
        res.json({
          message: `Welcome to Knjiga ${user.name}.`,
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
    email: user.email,
  };
  const options = {
    expiresIn: "24h",
  };
  return jwt.sign(payload, process.env.MY_SECRET, options);
}
module.exports = router;

//if token is expired, auto-delete the cookie using res.clearCookie
