import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import React, { useEffect, useState } from "react";
import { listTables, updateStatus } from "../utils/api";
import SeatingForm from "./SeatReservationForm";
import { createSeating } from "../utils/api";
/*handles seating using the form and buttons in SeatReservationForm.js 
which is accessed with the seating button in the reservations list display*/
function SeatingCreate() {
  const history = useHistory();

  const { reservation_id } = useParams();
  const initialFormState = {};
  const [tableError, setTableError] = useState(null);
  const [tableName, setTableName] = useState({ ...initialFormState });
  const [tables, setTables] = useState([]);
  const changeHandler = ({ target }) => {
    let value = target.value;
    setTableName({
      ...tableName,
      [target.name]: value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    async function addSeating() {
      try {
        await createSeating(tableName, reservation_id, abortController.signal);
        await updateStatus(reservation_id, "seated", abortController.signal);
        history.push(`/dashboard`);
      } catch (error) {
        setTableError(error);
      }
    }
    addSeating();
    return () => abortController.abort();
  };

  useEffect(() => {
    const abortController = new AbortController();
    async function loadTables() {
      try {
        const tables = await listTables(abortController.signal);
        setTables(tables);
      } catch (error) {
        setTableError([error.message]);
      }
    }
    loadTables();
    return () => abortController.abort();
  }, []);

  return (
    <div>
      <h1>Seat The Current Reservation:</h1>
      <ErrorAlert error={tableError} />
      <SeatingForm
        changeHandler={changeHandler}
        initialFormState={initialFormState}
        tables={tables}
      />

      <button
        form="SeatingForm"
        type="submit"
        className="btn btn-primary"
        onClick={submitHandler}
      >
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

export default SeatingCreate;
