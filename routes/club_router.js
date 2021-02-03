const express = require("express");
const router = express.Router();
const DB = require("../models/club_model");
const restricted = require("../auth/restricted");
const Books = require("../models/books_model");

router.post("/add", restricted, (req, res) => {
  let id = req.cookies.user_id;
  console.log(id);
  let clubData = req.body;
  clubData.admin = id;
  console.log(clubData);
  DB.addClub(clubData)
    .then((data) => {
      return res
        .status(200)
        .json({ message: "You successfully added a club.", data });
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
  // DB.getClubs(id)
  DB.getClubWithPhoto(id)
    .then((data) => {
      res.status(200).json({ message: "Here are your clubs", data });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Couldn't get your list of clubs", err });
    });
});

router.put("/edit/:id", restricted, async (req, res) => {
  let id = req.params.id;
  console.log("id of club", id);
  let body = req.body;
  // console.log(update);
  // finding the bookID
  let bookId = body.bookId;
  let update = { bookSelection: null };
  let BookFound = await Books.findBookByBookId(bookId);
  if (BookFound.length > 0) {
    let res_bookId = BookFound[0].id;
    update.bookSelection = res_bookId;
    DB.editClubBook({ id }, update)
      .then((data) => {
        return res
          .status(200)
          .json({ message: "You were able to update your club", data });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ message: "Couldn't update your club", err });
      });
  } else {
    addedBook = await Books.add(body);
    let res_bookId = addedBook[0].id;
    // console.log("added book id", bookSelection);
    update.bookSelection = res_bookId;
    DB.editClubBook({ id }, update)
      .then((data) => {
        res
          .status(200)
          .json({ message: "You were able to update your club", data });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ message: "Couldn't update your club", err });
      });
  }
});

module.exports = router;
