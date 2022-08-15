import React from "react";
//hanldles the design change of the tables list for a mobile phone
export default function TablesMobileList({ tables, resetHandler }) {
  return tables.map((table) => (
    <ol
      key={table.table_id}
      className="container-fluid d-block justify-content-center d-lg-none"
      style={{ listStyle: "none", textAlign: "center" }}
    >
      <li
        key="table"
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        Table: {table.table_id}
      </li>

      <li key="tableName">Table Name: {table.table_name}</li>

      <li key="capacity">Capacity: {table.capacity}</li>

      <li data-table-id-status={table.table_id} key="status">
        Status: {table.reservation_id ? "Occupied" : "Free"}
      </li>
      {table.reservation_id && (
        <li key="occupiedBy">
          Occupied By: Reservation #{table.reservation_id}
        </li>
      )}
      <li key="button">
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
  ));
}
