import React from "react";
import Seats from "./reservationSeats";
import EditButton from "./editButton";
import Cancel from "./reservationsCancel";
/*displays a list of the reservations for the Dashboard page and Search page, plus seat, edit, and cancel buttons when appropriate.
Acccesses the reservations information from Dashboard.js*/
export default function ReservationList({ reservations }) {
  function convertTo12Hour(oldFormatTime) {
    var oldFormatTimeArray = oldFormatTime.split(":");
    var HH = parseInt(oldFormatTimeArray[0]);
    var min = oldFormatTimeArray[1];
    var AMPM = HH >= 12 ? "PM" : "AM";
    var hours;
    if (HH === 0) {
      hours = 12;
    }
    if (HH > 12) {
      hours = HH - 12;
    } else {
      hours = HH;
    }
    var newFormatTime = `${hours}:${min} ${AMPM}`;
    return newFormatTime;
  }

  return (
    reservations.length !== 0 && (
      <div className="reservation-list">
        <table className="table">
          <thead className="thead">
            <tr>
              <th>Id</th>
              <th>Reservation Time:</th>
              <th>Reservation Date:</th>
              <th>First Name:</th>
              <th>Last Name:</th>
              <th>Party Size:</th>
              <th>Mobile Number:</th>
              <th>Status:</th>
              {reservations.some(
                (reservation) => reservation.status === "booked"
              ) && (
                <>
                  <th>Seat</th>
                  <th>Edit</th>
                  <th>Cancel</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.reservation_id}>
                <th>{reservation.reservation_id}</th>
                <td>{convertTo12Hour(reservation.reservation_time)}</td>
                <td>{reservation.reservation_date}</td>
                <td>{reservation.first_name}</td>
                <td>{reservation.last_name}</td>
                <td>{reservation.people}</td>
                <td>{reservation.mobile_number}</td>
                <td data-reservation-id-status={reservation.reservation_id}>
                  {reservation.status}
                </td>
                {reservation.status === "booked" && (
                  <>
                    <td>
                      <Seats reservation_id={reservation.reservation_id} />
                    </td>
                    <td>
                      <EditButton reservation_id={reservation.reservation_id} />
                    </td>
                    <td>
                      <Cancel reservation={reservation} />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <hr
          style={{ width: "100%", height: "2px", background: "#393a44" }}
        ></hr>
      </div>
    )
  );
}
