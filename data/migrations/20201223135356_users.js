exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments("id").primary();
      tbl.string("email", 128).notNullable().unique();
      tbl.string("name", 128).notNullable();
      tbl.string("password", 128).notNullable();
    })
    .createTable("books", (tbl) => {
      tbl.increments("id").primary();
      tbl.string("bookId").notNullable().unique();
      tbl.string("title", 128).notNullable();
      tbl.specificType("author", "text ARRAY").notNullable();
      tbl.text("searchInfo");
      tbl.string("image", 256).notNullable();
      tbl.text("description").notNullable();
      tbl.integer("pageCount").notNullable();
      tbl.string("publishDate", 64);
      tbl.specificType("categories", "text ARRAY");
      tbl.string("bookColor", 64).notNullable();
    })
    .createTable("club", (tbl) => {
      tbl.increments("id").primary();
      tbl.string("admin").notNullable();
      tbl.string("clubName").notNullable();
      tbl
        .integer("bookSelection")
        .unsigned()
        .references("books.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("club_members", (tbl) => {
      tbl
        .integer("club_id")
        .unsigned()
        .notNullable()
        .references("club.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("bookshelf", (tbl) => {
      tbl.increments("id").primary();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      tbl.string("title", 128).notNullable();
      tbl.string("description", 255);
    })
    .createTable("shelf_book_map", (tbl) => {
      tbl
        .integer("bookshelf_id")
        .unsigned()
        .notNullable()
        .references("bookshelf.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("book_id")
        .unsigned()
        .notNullable()
        .references("books.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("shelf_book_map")
    .dropTableIfExists("bookshelf")
    .dropTableIfExists("club_members")
    .dropTableIfExists("club")
    .dropTableIfExists("books")
    .dropTableIfExists("users");
};
