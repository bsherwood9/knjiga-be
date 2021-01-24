const db = require("../data/db");

module.exports = {
  addShelf,
  getMyShelves,
  editShelf,
};
function addShelf(shelf) {
  return db("bookshelf").insert(shelf).returning("*");
}

function getMyShelves(target) {
  return db("bookshelf").where("user_id", target).returning("*");
}

// function getShelvesWithData(target){
//     return db()
// }
function editShelf(id, change) {
  return db("bookshelf").where(id).update(change).returning("*");
}
