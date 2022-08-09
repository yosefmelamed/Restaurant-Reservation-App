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
  return reservations.map((reservation) => (
    <>
      <ol
        key={reservation.reservation_id}
        className="container-fluid d-block justify-content-center d-lg-none"
        style={{ listStyle: "none", textAlign: "center" }}
      >
        <li
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          {reservation.reservation_id}
        </li>
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
      </ol>
      <hr
        style={{
          width: "100%",
          height: "2px",
          background: "#393a44",
          marginTop: "70px",
        }}
      ></hr>
    </>
  ));
}

export default MobileList;
