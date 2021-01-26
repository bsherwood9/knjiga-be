const { buildSchema } = require("graphql");
const db = require("../data/db");

module.exports = {
  addShelf,
  getMyShelves,
  editShelf,
  getShelvesWithData,
};
function addShelf(shelf) {
  return db("bookshelf").insert(shelf).returning("*");
}

function getMyShelves(target) {
  return db("bookshelf").where("user_id", target).returning("*");
}

function getShelvesWithData(target) {
  return db("bookshelf as bs")
    .join("shelf_book_map as s", "s.bookshelf_id", "bs.id")
    .join("books as b", "b.id", "s.book_id")
    .where({ "bs.user_id": target })
    .select("bs.*", db.raw("array_agg(b.*)as books"))
    .groupBy("books");
}

// return db("posts as p")
//     .join("vendors as v", "v.id", "p.vendors_id")
//     .join("users as u", "u.id", "v.users_id")
//     .where({ "u.id": user_id })
//     .select("p.*");
function editShelf(id, change) {
  return db("bookshelf").where(id).update(change).returning("*");
}
