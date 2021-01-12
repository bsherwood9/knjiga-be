const db = require("../data/db")

module.exports = {
    addUser,
    find
}
function addUser(newUser) {
    return db('users').insert(newUser).returning("*")
}

function find() {
    return db('users').select("*")
}