import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "./reservationForm";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationNew() {
  const history = useHistory();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [reservationError, setReservationError] = useState(null);
  const [reservation, setReservation] = useState({ ...initialFormState });
  const changeHandler = ({ target }) => {
    let value = target.value;
    if (target.name === "people") {
      value = Number(value);
    }
    setReservation({
      ...reservation,
      [target.name]: value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    async function addReservation() {
      try {
        await createReservation({ data: reservation }, abortController.signal);
        history.push(`/dashboard?date=${reservation.reservation_date}`);
      } catch (error) {
        setReservationError(error);
      }
    }
    addReservation();
    return () => abortController.abort();
  };

  return (
    <div>
      <h1>Create A New Reservation</h1>
      <ErrorAlert error={reservationError} />
      <ReservationForm
        changeHandler={changeHandler}
        reservation={reservation}
      />

      <button
        form="reservationForm"
        type="submit"
        className="btn btn-primary"
        onClick={submitHandler}
      >
        {" "}
        Submit
      </button>

      <button
        className="btn btn-secondary mr-2"
        onClick={() => history.goBack()}
      >
        Cancel
      </button>
    </div>
  );
}

export default ReservationNew;
