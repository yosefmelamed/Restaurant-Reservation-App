//handles reservations CRUD functions and relevant validation
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  res.json({ data: res.locals.reservations });
}

async function read(req, res, next) {
  res.json({ data: res.locals.reservation });
}

async function create(req, res, next) {
  const { status } = req.body.data;
  if (status === "seated") {
    next({
      status: 400,
      message: `new reservation status cannot be "seated"`,
    });
  }
  if (status === "finished") {
    next({
      status: 400,
      message: `new reservation status cannot be "finished"`,
    });
  } else {
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
  }
}

async function readStatus(req, res, next) {
  const { reservation_id } = req.params;
  const data = await service.readStatus(reservation_id);
  res.json(data);
}

async function updateStatus(req, res, next) {
  const { status } = req.body.data;
  const { reservation_id } = req.params;
  const updatedReservation = await service.updateStatus(reservation_id, status);
  res.status(200).json({ data: updatedReservation });
}

async function update(req, res, next) {
  let updatedInfo = req.body.data;

  const { reservation_id } = req.params;
  const updated = await service.update(reservation_id, updatedInfo);
  res.status(200).json({ data: updated });
}

async function queryInput(req, res, next) {
  const { date, mobile_number } = req.query;
  if (date) {
    res.locals.reservations = await service.list(date);
    next();
  } else if (mobile_number) {
    res.locals.reservations = await service.search(mobile_number);
    next();
  } else {
    next({
      status: 400,
      message: `No query was specified in the URL`,
    });
  }
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const found = await service.read(reservation_id);
  if (found) {
    res.locals.reservation = found;
    return next();
  } else
    next({
      status: 404,
      message: `Reservation ${reservation_id} does not exist.`,
    });
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({
      status: 400,
      message: `Reservation must include a ${propertyName}`,
    });
  };
}

function peopleIsANumber(req, res, next) {
  const { people } = req.body.data;
  if (people < 1 || typeof people !== "number") {
    next({
      status: 400,
      message: `people must be a valid number.`,
    });
  }
  next();
}

function validDateAndTime(req, res, next) {
  const { data: { reservation_date, reservation_time } = {} } = req.body;
  const reservationDay = new Date(reservation_date).getUTCDay();
  let now = new Date();
  let month = now.getMonth();
  month = month + 1;
  const [hour, minute] = reservation_time.split(":");
  if (reservation_date === "not-a-date") {
    next({
      status: 400,
      message: `the reservation_date entered is not a valid date`,
    });
  }
  if (reservation_time === "not-a-time") {
    next({
      status: 400,
      message: `the reservation_time entered is not a valid time`,
    });
  }
  if (reservationDay === 2) {
    next({
      status: 400,
      message: "The restuarant is closed on Tuesdays",
    });
  }
  if (
    hour < 10 ||
    hour > 21 ||
    (hour == 10 && minute < 30) ||
    (hour == 21 && minute > 30)
  ) {
    next({
      status: 400,
      message:
        "Your reservation must be between the time of 10:30 AM and 9:30 PM.",
    });
  }
  next();
}

async function futureDateAndTime(req, res, next) {
  const { data: { reservation_date, reservation_time } = {} } = req.body;
  let now = new Date();
  let time1 = Number(now.toTimeString().substring(0, 5).split(":").join(""));
  let time2 = Number(reservation_time.substring(0, 5).split(":").join(""));
  let date1 = Number(reservation_date.split("-").join(""));
  let year = now.getFullYear();
  let month = now.getMonth();
  month = month + 1;
  let day = now.getUTCDate();
  console.log(time1, time2, date1, year, month, day);
  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;
  let currentDate = Number(`${year}${month}${day}`);
  if ((date1 === currentDate && time2 < time1) || date1 < currentDate) {
    next({
      status: 400,
      message: "Reservations can only be made for a future date and time",
    });
  }
  next();
}

async function validStatus(req, res, next) {
  const { status } = req.body.data;
  const currentStatus = res.locals.reservation.status;
  if (
    status !== "finished" &&
    status !== "seated" &&
    status !== "booked" &&
    status !== "cancelled"
  ) {
    next({
      status: 400,
      message: `Error: unknown status`,
    });
  }
  if (currentStatus === "finished") {
    next({
      status: 400,
      message: `A finished reservation cannot be updated`,
    });
  }
  next();
}

module.exports = {
  list: [asyncErrorBoundary(queryInput), asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  create: [
    asyncErrorBoundary(bodyDataHas("first_name")),
    asyncErrorBoundary(bodyDataHas("last_name")),
    asyncErrorBoundary(bodyDataHas("mobile_number")),
    asyncErrorBoundary(bodyDataHas("reservation_date")),
    asyncErrorBoundary(bodyDataHas("reservation_time")),
    asyncErrorBoundary(bodyDataHas("people")),
    asyncErrorBoundary(peopleIsANumber),
    asyncErrorBoundary(validDateAndTime),
    asyncErrorBoundary(futureDateAndTime),
    asyncErrorBoundary(create),
  ],
  read2: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(readStatus),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(bodyDataHas("first_name")),
    asyncErrorBoundary(bodyDataHas("last_name")),
    asyncErrorBoundary(bodyDataHas("mobile_number")),
    asyncErrorBoundary(bodyDataHas("reservation_date")),
    asyncErrorBoundary(bodyDataHas("reservation_time")),
    asyncErrorBoundary(bodyDataHas("people")),
    asyncErrorBoundary(peopleIsANumber),
    asyncErrorBoundary(validDateAndTime),
    asyncErrorBoundary(update),
  ],
  update2: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(validStatus),
    asyncErrorBoundary(updateStatus),
  ],
};
