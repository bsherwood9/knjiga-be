exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("club")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("club").insert([
        { admin: "11", clubName: "doofus" },
        { admin: "11", clubName: "Cat Hat reading" },
        { admin: "10", clubName: "you see this" },
      ]);
    });
};
