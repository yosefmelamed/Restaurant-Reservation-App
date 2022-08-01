//adds a status column to the tables table
exports.up = function (knex) {
  return knex.schema.table("tables", (table) => {
    table.string("status").notNullable().defaultTo("Free");
  });
};

exports.down = function (knex) {
  return knex.schema.table("tables", (table) => {
    table.dropColumn("status");
  });
};
