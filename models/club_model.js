const db = require("../data/db");

module.exports = {
  //   addBookToClub,
  addClub,
  getClubs,
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
