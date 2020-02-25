exports.up = function(knex) {
  return knex.schema.createTable("Users", tbl => {
    tbl.increments();
    tbl
      .string("userName", 256)
      .notNullable()
      .unique()
      .index();
    tbl.string("passWord", 256).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Users");
};
