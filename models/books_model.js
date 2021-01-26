const db = require("../data/db");

module.exports = {
  add,
  findBookById,
  findBookByBookId,
  findAllBooks,
};
function add(newBook) {
  return db("books").insert(newBook).returning("*");
}

function findBookById(id) {
  return db("books").where(id).returning("*");
}

function findBookByBookId(id) {
  return db("books").where("bookId", id).returning("*");
}

function findAllBooks() {
  return db("books").select("*");
}
