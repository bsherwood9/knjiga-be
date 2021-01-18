const db = require("../data/db");

module.exports = {
  addUser,
  find,
  findBy,
};
function addUser(newUser) {
  return db("users").insert(newUser).returning("*");
}

function find() {
  return db("users").select("*");
}

function findBy(filter) {
  return db("users").where("email", filter).first().returning("*");
}
