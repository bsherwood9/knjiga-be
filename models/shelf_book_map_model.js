const db = require("../data/db");

module.exports = {
  addShelfBookRelation,
};

function addShelfBookRelation(data) {
  return db("shelf_book_map").insert(data).returning("*");
}
