exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments("id").primary();
      tbl.string("email", 128).notNullable().unique();
      tbl.string("password", 128).notNullable();
      tbl.text("role", 64).notNullable();
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
    .createTable("bookshelf", (tbl) => {
      tbl.increments("id").primary();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      tbl.string("title", 128).notNullable().unique();
      tbl.string("description", 255);
      tbl.integer("volume_count").notNullable();
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
    .dropTableIfExists("books")
    .dropTableIfExists("users");
};
