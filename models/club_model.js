const db = require("../data/db");

module.exports = {
  //   addBookToClub,
  addClub,
  getClubs,
  editClubBook,
  getClubWithPhoto,
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

function getClubWithPhoto(target) {
  return db("club as c")
    .join("books as b", "b.id", "c.bookSelection")
    .where("admin", target)
    .select("c.clubName", "b.image");
}

function editClubBook(id, change) {
  return db("club").where(id).update(change).returning("*");
}
