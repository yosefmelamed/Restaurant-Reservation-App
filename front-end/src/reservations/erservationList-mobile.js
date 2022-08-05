import Seats from "./reservationSeats";
import EditButton from "./editButton";
import Cancel from "./reservationsCancel";
function MobileList({ reservations }) {
  const onClickHandler = (event) => {
    event.preventDefault();
    // console.log(event.target);
  };

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
    <table className="table-sm d-flex justify-content-center  d-sm-none">
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
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
            <tbody className="d-flex justify-content-center">
              <tr key={reservation.reservation_id}>
                <div className="accordion-body">
                  <td>Time:</td>
                  <td>{convertTo12Hour(reservation.reservation_time)}</td>
                </div>
              </tr>
            </tbody>
            <tbody className="d-flex justify-content-center">
              <tr key={reservation.reservation_id}>
                <div className="accordion-body">
                  <td>Date:</td>
                  <td>{reservation.reservation_date}</td>
                </div>
              </tr>
            </tbody>
            <tbody className="d-flex justify-content-center">
              <tr key={reservation.reservation_id}>
                <div className="accordion-body">
                  <td>First-Name:</td>
                  <td>{reservation.first_name}</td>
                </div>
              </tr>
            </tbody>
            <tbody className="d-flex justify-content-center">
              <tr key={reservation.reservation_id}>
                <div className="accordion-body">
                  <td>Last-Name:</td>
                  <td>{reservation.last_name}</td>
                </div>
              </tr>
            </tbody>
            <tbody className="d-flex justify-content-center">
              <tr key={reservation.reservation_id}>
                <div className="accordion-body">
                  <td>Party-Size:</td>
                  <td>{reservation.people}</td>
                </div>
              </tr>
            </tbody>
            <tbody className="d-flex justify-content-center">
              <tr key={reservation.reservation_id}>
                <div className="accordion-body">
                  <td>Mobile-Number:</td>
                  <td>{reservation.mobile_number}</td>
                </div>
              </tr>
            </tbody>
            <tbody className="d-flex justify-content-center">
              <tr key={reservation.reservation_id}>
                <div className="accordion-body">
                  <td>Status:</td>
                  <td data-reservation-id-status={reservation.reservation_id}>
                    {reservation.status}
                  </td>
                </div>
              </tr>
            </tbody>
            <tbody className="d-flex justify-content-center">
              <tr key={reservation.reservation_id}>
                <div className="accordion-body">
                  {reservation.status === "booked" && (
                    <>
                      <td>
                        <Seats reservation_id={reservation.reservation_id} />
                      </td>
                      <td>
                        <EditButton
                          reservation_id={reservation.reservation_id}
                        />
                      </td>
                      <td>
                        <Cancel reservation={reservation} />
                      </td>
                    </>
                  )}
                </div>
              </tr>
            </tbody>
          </div>
        </div>
      </div>
    </table>
  ));
}

export default MobileList;
