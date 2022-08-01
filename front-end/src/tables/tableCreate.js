import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import TableForm from "./tableForm";
import ErrorAlert from "../layout/ErrorAlert";
//handles a new table creation using the form in tableForm.js
function TableNew() {
  const history = useHistory();

  const initialFormState = {
    table_name: "",
    capacity: "",
  };

  const [reservationError, setReservationError] = useState(null);
  const [tableInfo, setTableInfo] = useState({ ...initialFormState });
  const changeHandler = ({ target }) => {
    let value = target.value;
    if (target.name === "capacity") {
      value = Number(value);
    }
    setTableInfo({
      ...tableInfo,
      [target.name]: value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    async function addTable() {
      try {
        await createTable({ data: tableInfo }, abortController.signal);
        history.push(`/dashboard`);
      } catch (error) {
        setReservationError(error);
      }
    }
    addTable();
    return () => abortController.abort();
  };

  return (
    <div>
      <h1>Create A New Table</h1>
      <ErrorAlert error={reservationError} />
      <TableForm changeHandler={changeHandler} tableInfo={tableInfo} />

      <button
        form="TableForm"
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

export default TableNew;
