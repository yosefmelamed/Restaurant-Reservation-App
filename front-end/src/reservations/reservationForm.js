//new reservation form-Also used in reservationsEdit.js for editing a reservation
export default function ReservationForm({ changeHandler, reservation }) {
  return (
    <>
      <form id="reservationForm" className="reservation-form">
        <fieldset>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              id="fist_name"
              name="first_name"
              className="form-control"
              required={true}
              placeholder="First Name"
              value={reservation.first_name}
              onChange={changeHandler}
            />
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              id="last_name"
              name="last_name"
              className="form-control"
              required={true}
              placeholder="Last Name"
              value={reservation.last_name}
              onChange={changeHandler}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile_number">Mobile Number</label>
            <input
              id="mobile_number"
              name="mobile_number"
              className="form-control"
              type="tel"
              placeholder="Mobile Number"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              required={true}
              minLength="10"
              maxLength="10"
              value={reservation.mobile_number}
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_date">Reservation Date</label>
            <input
              id="reservation_date"
              name="reservation_date"
              className="form-control"
              type="date"
              placeholder="YYYY-MM-DD"
              pattern="\d{4}-\d{2}-\d{2}"
              required={true}
              value={reservation.reservation_date}
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_time">Reservation Time</label>
            <input
              id="reservation_time"
              name="reservation_time"
              className="form-control"
              type="time"
              placeholder="HH:MM"
              pattern="[0-9]{2}:[0-9]{2}"
              required={true}
              value={reservation.reservation_time}
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="people">Party Size</label>
            <input
              id="people"
              name="people"
              className="form-control"
              type="number"
              required={true}
              placeholder="Party Size"
              value={reservation.people}
              onChange={changeHandler}
            />
          </div>
        </fieldset>
      </form>
    </>
  );
}
