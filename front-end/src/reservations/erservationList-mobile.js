import Seats from "./reservationSeats";
import EditButton from "./editButton";
import Cancel from "./reservationsCancel";
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
  return reservations.map((reservation, index) => (
    <ul
      key={index}
      className="container d-block justify-content-center d-sm-none"
      style={{ listStyle: "none" }}
    >
      <li>
        Time:
        {convertTo12Hour(reservation.reservation_time)}
      </li>

      <li>
        Date:
        {reservation.reservation_date}
      </li>

      <li>
        First-Name:
        {reservation.first_name}
      </li>
      <li>
        Last-Name:
        {reservation.last_name}
      </li>
      <li>
        Party-Size:
        {reservation.people}
      </li>
      <li>
        Mobile-Number:
        {reservation.mobile_number}
      </li>
      <li data-reservation-id-status={reservation.reservation_id}>
        Status:
        {reservation.status}
      </li>
      <li>
        {reservation.status === "booked" && (
          <>
            <Seats reservation_id={reservation.reservation_id} />

            <EditButton reservation_id={reservation.reservation_id} />

            <Cancel reservation={reservation} />
          </>
        )}
      </li>
    </ul>
  ));
}

export default MobileList;
