//form for creating a new table for seating
export default function TableForm({ changeHandler, tableInfo }) {
  return (
    <>
      <form id="tableForm" className="table-form">
        <fieldset>
          <div className="form-group">
            <label htmlFor="table_name">Table Name</label>
            <input
              id="table_name"
              name="table_name"
              className="form-control"
              required={true}
              placeholder="Table Name"
              value={tableInfo.table_name}
              onChange={changeHandler}
            />
          </div>

          <div className="form-group">
            <label htmlFor="capacity">Capacity</label>
            <input
              id="capacity"
              name="capacity"
              className="form-control"
              required={true}
              placeholder="Capacity"
              value={tableInfo.capacity}
              onChange={changeHandler}
            />
          </div>
        </fieldset>
      </form>
    </>
  );
}
