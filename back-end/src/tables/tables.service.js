//tables CRUD functions using knex.js query-builder
const knex = require("../db/connection");

const table = "tables";

function list() {
  return knex(table).select("*").orderBy("table_name");
}

function read(table_id) {
  return knex(table).select("*").where({ table_id }).first();
}

function read2(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function create(table1) {
  return knex(table)
    .insert(table1)
    .returning("*")
    .then((created) => created[0]);
}

function update(table_id, reservation_id) {
  return knex(table)
    .select("*")
    .where({ table_id })
    .update({ reservation_id }, "*");
}

module.exports = {
  list,
  read,
  read2,
  create,
  update,
};
