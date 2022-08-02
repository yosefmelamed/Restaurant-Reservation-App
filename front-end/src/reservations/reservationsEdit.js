import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import ReservationForm from "./reservationForm";
import { readReservation, updateReservation } from "../utils/api";
import { useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
/*reservations page edit component; accesses a reservation's information, inputs it into the form from reservationsForm.js, 
and displays and handles the submit ans cancel buttons*/
export default function Edit() {
  const history = useHistory();
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
    reservation_id: "",
  };
  const { reservation_id } = useParams();
  const [reservation, setReservation] = useState({ ...initialFormState });
  const [reservationError, setReservationError] = useState(null);

  const changeHandler = ({ target }) => {
    let value = target.value;
    if (target.name === "people" && value === 0) {
      value = "";
    }
    if (target.name === "people" && value !== 0) {
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
    async function update() {
      try {
        await updateReservation(
          reservation_id,
          reservation,
          abortController.signal
        );
        history.push(`/dashboard?date=${reservation.reservation_date}`);
      } catch (error) {
        setReservationError(error);
      }
    }
    update();
    return () => abortController.abort();
  };

  useEffect(() => {
    const abortController = new AbortController();
    async function loadReservations() {
      try {
        const reservation = await readReservation(
          reservation_id,
          abortController.signal
        );
        let date1 = reservation.reservation_date.split("-").join("");
        let year = Number(date1.substr(0, 4));
        let month = Number(date1.substr(4, 2));
        let day = Number(date1.substr(6, 2));
        console.log(year, month, day);
        if (month < 10) month = `0${month}`;
        if (day < 10) day = `0${day}`;
        let formatedDate = `${year}-${month}-${day}`;
        console.log(formatedDate);
        reservation.reservation_date = formatedDate;
        setReservation(reservation);
      } catch (error) {
        setReservationError(error);
      }
    }
    loadReservations();
    return () => abortController.abort();
  }, []);

  return (
    <>
      <ErrorAlert error={reservationError} />
      <ReservationForm
        reservation={reservation}
        changeHandler={changeHandler}
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
    </>
  );
}
