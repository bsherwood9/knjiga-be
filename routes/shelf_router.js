const express = require("express");
const router = express.Router();
const DB = require("../models/shelf_model");
const restricted = require("../auth/restricted");

router.post("/add", restricted, (req, res) => {
  let id = req.cookies.user_id;
  console.log(id);
  let shelfData = req.body;
  shelfData.user_id = id;
  console.log(shelfData);
  DB.addShelf(shelfData)
    .then((data) => {
      res
        .status(200)
        .json({ message: "You successfully added a shelf.", data });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "There was an error adding that shelf.", err });
    });
});

router.get("/", restricted, (req, res) => {
  let user_id = req.cookies.user_id;
  console.log(user_id);
  DB.getMyShelves(user_id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json({
        message: "There was an error finding your shelves.",
        err,
      });
    });
});
module.exports = router;
