import React from "react";
import { Table } from "react-bootstrap";

//hanldles the design change of the tables list for a mobile phone
export default function TablesMobileList({ tables, resetHandler }) {
  return tables.map((table) => (
    <>
      <ol
        key={table.table_id}
        className="container-fluid d-block justify-content-center d-lg-none"
        style={{ listStyle: "none", textAlign: "center" }}
      >
        <li>Table Name: {table.table_name}</li>

        <li>Capacity: {table.capacity}</li>

        <li data-table-id-status={table.table_id}>
          Status: {table.reservation_id ? "Occupied" : "Free"}
        </li>
        {table.reservation_id && (
          <li>Occupied By: Reservation #{table.reservation_id}</li>
        )}
        <li>
          <>
            {table.reservation_id && (
              <button
                type="button"
                className="btn btn-secondary mr-2 my-2 mb-5"
                data-table-id-finish={table.table_id}
                value={[table.table_id, table.reservation_id]}
                onClick={resetHandler}
              >
                Finish
              </button>
            )}
          </>
        </li>
      </ol>
    </>
  ));
}
