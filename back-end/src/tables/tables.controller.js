const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reservations = require("../reservations/reservations.service");

async function list(req, res, next) {
  res.json({ data: res.locals.tables });
}

async function read(req, res, next) {
  res.json({ data: res.locals.table });
}

async function create(req, res, next) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res, next) {
  const { reservation_id } = req.body.data;
  const { table_id } = req.params;
  const seated = await service.update(table_id, reservation_id);
  await reservations.updateStatus(reservation_id, "seated");
  res.status(200).json({ seated });
}

async function destroy(req, res, next) {
  const { table_id } = req.params;
  const { reservation_id } = res.locals.table;
  const seated = await service.update(table_id, null);
  await reservations.updateStatus(reservation_id, "finished");
  res.status(200).json({ seated });
}

async function meetsCapacity2(req, res, next) {
  const { reservation_id } = req.body.data;
  const reservation = await reservations.read(reservation_id);
  const { people } = reservation;
  const { capacity } = res.locals.table;
  if (people <= capacity) {
    next();
  } else {
    next({
      status: 400,
      message: `Current reservation exceeds the table capacity.`,
    });
  }
}

async function queryInput(req, res, next) {
  if (req) {
    res.locals.tables = await service.list();
    next();
  } else
    next({
      status: 400,
      message: `No query was specified in the URL`,
    });
}

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const found = await service.read(table_id);
  if (found) {
    res.locals.table = found;
    return next();
  } else
    next({
      status: 404,
      message: `Table ${table_id} does not exist.`,
    });
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  const found = await reservations.read(reservation_id);
  if (found) {
    res.locals.reservation = found;
    return next();
  } else
    next({
      status: 404,
      message: `Reservation ${reservation_id} does not exist.`,
    });
}

async function tableIsOccupied2(req, res, next) {
  const { reservation_id } = res.locals.table;
  if (!reservation_id) {
    return next();
  } else {
    next({
      status: 400,
      message: `The current table is already occupied.`,
    });
  }
}

async function tableIsNotOccupied(req, res, next) {
  const { reservation_id } = res.locals.table;
  if (reservation_id) {
    return next();
  } else {
    next({
      status: 400,
      message: `The current table is not occupied.`,
    });
  }
}

async function reservationIsAlreadySeated(req, res, next) {
  const { reservation_id } = req.body.data;
  const { status } = await reservations.readStatus(reservation_id);
  if (status === "seated") {
    next({
      status: 400,
      message: "The current reservation is already seated.",
    });
  }
  next();
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({
      status: 400,
      message: `Order must include a ${propertyName}`,
    });
  };
}

function ValidName(req, res, next) {
  const { table_name } = req.body.data;
  if (table_name.length < 2) {
    next({
      status: 400,
      message: `table_name must contain at least two characters.`,
    });
  }
  next();
}

function CapacityIsANumber(req, res, next) {
  const { capacity } = req.body.data;
  if (capacity < 1 || typeof capacity !== "number") {
    next({
      status: 400,
      message: `capacity must be a valid number.`,
    });
  }
  next();
}

module.exports = {
  list: [asyncErrorBoundary(queryInput), asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
  create: [
    bodyDataHas("table_name"),
    bodyDataHas("capacity"),
    asyncErrorBoundary(ValidName),
    asyncErrorBoundary(CapacityIsANumber),
    asyncErrorBoundary(create),
  ],

  update: [
    bodyDataHas("reservation_id"),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(reservationIsAlreadySeated),
    asyncErrorBoundary(tableIsOccupied2),
    asyncErrorBoundary(meetsCapacity2),
    asyncErrorBoundary(update),
  ],
  delete: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(tableIsNotOccupied),
    asyncErrorBoundary(destroy),
  ],
};
