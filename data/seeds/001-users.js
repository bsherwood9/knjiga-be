exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          email: "bsherwood9@gmail.com",
          username: "teacup",
          password: "hellothere",
        },
      ]);
    });
};
