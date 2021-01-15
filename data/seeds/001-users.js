exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          email: "jim@d.com",
          name: "Jim Doe",
          password: "hellothere",
        },
      ]);
    });
};
