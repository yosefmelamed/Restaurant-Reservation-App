import React from "react";
//seating form using a dropdown menu- accesses the tables information from SeatReservationCreate.js
function SeatingForm({ tables, initialFormState, changeHandler }) {
  return (
    <>
      <form id="SeatingForm" className="seating-form">
        <div>
          <label htmlFor="table">
            Table Number
            <select
              name="table_id"
              id="table_id"
              value={initialFormState.table_id}
              onChange={changeHandler}
            >
              <option value="">--Select A Table--</option>
              {tables.map((table) => (
                <option key={table.table_id} value={table.table_id}>
                  {table.table_name} - {table.capacity}
                </option>
              ))}
            </select>
          </label>
        </div>
      </form>
    </>
  );
}

export default SeatingForm;
