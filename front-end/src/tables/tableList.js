import React from "react";
//displays the tables, tables capacity, and a finish button for freeing up a table-accesses the reset handler in Dashboard.js
export default function TableList({ tables, resetHandler }) {
  return (
    <div className="d-flex justify content-center">
      <table className="table table-responsive">
        <thead className="thead ">
          <tr>
            <th>Table Name:</th>
            <th>Capacity:</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table, index) => (
            <tr key={index}>
              <th>{table.table_name}</th>
              <td>{table.capacity}</td>
              <td data-table-id-status={table.table_id}>
                {table.reservation_id ? "Occupied" : "Free"}
              </td>
              <td>
                {table.reservation_id && (
                  <button
                    type="button"
                    className="btn btn-secondary mr-2"
                    data-table-id-finish={table.table_id}
                    value={[table.table_id, table.reservation_id]}
                    onClick={resetHandler}
                  >
                    Finish
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
