const express = require("express");
const router = express.Router();
const Books = require("../models/books_model");

router.get("/", (req, res) => {
  Books.findAllBooks()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.json(err);
    });
});

// by post ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Books.findBookById({ id })
    .first()
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/addBook", async (req, res) => {
  const newBook = req.body;
  //   const checkBook = await Books.findBookByBookId(newBook);
  console.log(newBook.bookId);
  //   if (checkBook) {
  //     res.status(300).json({ message: "Book is already present" });
  //   } else {
  Books.add(newBook)
    .then((data) => {
      res.status(208).json({ message: "You successfully added a book.", data });
    })
    .catch((err) => {
      if (err.code === "23505") {
        return res
          .status(500)
          .json({ message: "That book already exists.", err });
      } else {
        return res
          .status(500)
          .json({ message: "There was an error adding that book.", err });
      }
    });
  //   }
});

module.exports = router;
