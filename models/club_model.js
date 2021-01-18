const db = require("../data/db");

module.exports = {
  //   addBookToClub,
  addClub,
  getClubs,
  editClubBook,
};
// function addBookToClub(newBook) {
//   return db("club").insert(newBook).returning("*");
// }
function addClub(clubData) {
  return db("club").insert(clubData).returning("*");
}

function getClubs(target) {
  return db("club").where("admin", target).returning("*");
}
function editClubBook(id, change) {
  return db("club").where(id).update(change).returning("*");
}
