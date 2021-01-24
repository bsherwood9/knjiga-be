exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("bookshelf")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("bookshelf").insert([
        {
          user_id: "1",
          title: "Favorites",
          description: "A shelf of my favorites this year.",
        },
      ]);
    });
};
