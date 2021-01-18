const express = require("express");
const router = express.Router();
const DB = require("../models/club_model");
const restricted = require("../auth/restricted");

router.post("/add", restricted, (req, res) => {
  let id = req.cookies.user_id;
  let clubData = req.body;
  clubData.admin = id;
  DB.addClub(clubData)
    .then((data) => {
      res.status(200).json({ message: "You successfully added a club.", data });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "There was an error adding that club.", err });
    });
});

router.get("/clubList", restricted, (req, res) => {
  let id = req.cookies.user_id;
  console.log(id);
  DB.getClubs(id)
    .then((data) => {
      res.status(200).json({ message: "Here are your clubs", data });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Couldn't get your list of clubs", err });
    });
});

module.exports = router;
