// Update with your config settings.
require("dotenv").config({ path: "./.env" });
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5433,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "kniga_db",
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    //set undefined keys and values to null by default
    useNullAsDefault: true,
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
