import Seats from "./reservationSeats";
import EditButton from "./editButton";
import Cancel from "./reservationsCancel";
import React from "react";

//hanldles the design change of the reservations list for a mobile phone
function MobileList({ reservations }) {
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
  return reservations.map((reservation) => (
    <React.Fragment key={reservation.reservation_id}>
      <ol
        className="container-fluid d-block justify-content-center d-lg-none"
        style={{ listStyle: "none", textAlign: "center" }}
      >
        <li
          key="reservationNumber"
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          Reservation #{reservation.reservation_id}
        </li>
        <li key="time">
          Time: {convertTo12Hour(reservation.reservation_time)}
        </li>

        <li key="date">Date: {reservation.reservation_date}</li>

        <li key="firstName">First-Name: {reservation.first_name}</li>
        <li key="lastName">Last-Name: {reservation.last_name}</li>
        <li key="partySize">Party-Size: {reservation.people}</li>
        <li key="mobileNumber">Mobile-Number: {reservation.mobile_number}</li>
        <li
          key="status"
          data-reservation-id-status={reservation.reservation_id}
        >
          Status: {reservation.status}
        </li>
        <li key="buttons">
          {reservation.status === "booked" && (
            <>
              <Seats reservation_id={reservation.reservation_id} />

              <EditButton reservation_id={reservation.reservation_id} />

              <Cancel reservation={reservation} />
            </>
          )}
        </li>
      </ol>
      <hr
        className="d-lg-none"
        style={{
          width: "100%",
          height: "2px",
          background: "#393a44",
          marginTop: "70px",
        }}
      ></hr>
    </React.Fragment>
  ));
}

export default MobileList;
