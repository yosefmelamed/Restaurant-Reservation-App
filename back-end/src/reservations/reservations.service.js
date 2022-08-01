//reservations CRUD functions using knex.js query-builder
const knex = require("../db/connection");

const table = "reservations";

function list(date) {
  return knex(table)
    .select("*")
    .where({ reservation_date: date })
    .whereNot({ status: "finished" })
    .orderBy("reservation_time");
}

function read(reservation_id) {
  return knex(table).select("*").where({ reservation_id }).first();
}

function create(reservation) {
  return knex(table)
    .insert(reservation)
    .returning("*")
    .then((created) => created[0]);
}

function update(reservation_id, updatedInfo) {
  return knex(table)
    .select("*")
    .where({ reservation_id })
    .update(updatedInfo, "*")
    .then((updatedReservation) => updatedReservation[0]);
}

function readStatus(reservation_id) {
  return knex(table).select("status").where({ reservation_id }).first();
}

function updateStatus(reservation_id, status) {
  return knex(table)
    .select("*")
    .where({ reservation_id })
    .update({ status }, "*")
    .then((updatedReservation) => updatedReservation[0]);
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  list,
  read,
  create,
  update,
  readStatus,
  updateStatus,
  search,
};
