const express = require("express");
const router = express.Router();
const Books = require("../models/books_model");
const MapRelation = require("../models/shelf_book_map_model");
const restricted = require("../auth/restricted");

router.get("/", restricted, (req, res) => {
  Books.findAllBooks()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.json(err);
    });
});

//adding
router.post("/add", restricted, async (req, res) => {
  const newBook = req.body;

  let bookId = newBook.bookId;
  let shelfId = newBook.shelfId;
  let response = {
    success: 1,
    failure: 0,
  };
  let serverRes = "";

  delete newBook.shelfId;

  let BookFound = await Books.findBookByBookId(bookId);
  //If the book can be found, then just add to book_shelf map
  if (BookFound.length > 0) {
    let newbookid = BookFound[0].id;
    serverRes = await AddMapRelation(shelfId, newbookid);
    //If it can't be found, add to books, then to book shelf map
  } else {
    let addedBook = await Books.add(newBook);
    serverRes = await AddMapRelation(shelfId, addedBook[0].id);
  }

  if (serverRes === response.success) {
    res.status(200).json("You successfully added that book to your shelf.");
  }
  if (serverRes === response.failure) {
    res.status(500).json("There was an error adding that book to your shelf.");
  }
});

// by post ID
router.get("/:id", restricted, (req, res) => {
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

router.post("/addBook", restricted, async (req, res) => {
  const newBook = req.body;
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

function AddMapRelation(bookshelf_id, book_id) {
  return MapRelation.addShelfBookRelation({
    bookshelf_id: bookshelf_id,
    book_id: book_id,
  })
    .then((res) => {
      console.log("res", res);
      if (res) {
        return 1;
      } else {
        return 0;
      }
    })
    .catch((err) => {
      return 0;
    });
}
