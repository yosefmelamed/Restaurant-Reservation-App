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
      className="container table-sm d-flex justify-content-center d-sm-none"
    >
      <div
        className="accordion d-flex-justify-content-center"
        id="accordionExample"
      >
        <div className="accordion-item">
          <h2 className="accordion-header " id="headingOne">
            <button
              className="accordion-button btn btn-primary"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              {`Reservation Id: ${reservation.reservation_id}`}
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <li className="d-flex justify-content-center accordion-body">
              Time:
              {convertTo12Hour(reservation.reservation_time)}
            </li>

            <li className="d-flex justify-content-center accordion-body">
              Date:
              {reservation.reservation_date}
            </li>

            <li className="d-flex justify-content-center accordion-body">
              First-Name:
              {reservation.first_name}
            </li>
            <li className="d-flex justify-content-center accordion-body">
              Last-Name:
              {reservation.last_name}
            </li>
            <li className="d-flex justify-content-center accordion-body">
              Party-Size:
              {reservation.people}
            </li>
            <li className="d-flex justify-content-center accordion-body">
              Mobile-Number:
              {reservation.mobile_number}
            </li>
            <li
              className="d-flex justify-content-center accordion-body"
              data-reservation-id-status={reservation.reservation_id}
            >
              Status:
              {reservation.status}
            </li>
            <li className="d-flex justify-content-center accordion-body">
              {reservation.status === "booked" && (
                <>
                  <Seats reservation_id={reservation.reservation_id} />

                  <EditButton reservation_id={reservation.reservation_id} />

                  <Cancel reservation={reservation} />
                </>
              )}
            </li>
          </div>
        </div>
      </div>
    </ul>
  ));
}

export default MobileList;
