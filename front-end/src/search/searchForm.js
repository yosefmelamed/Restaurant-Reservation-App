export default function SearchForm({
  changeHandler,
  submitHandler,
  mobile_number,
}) {
  return (
    <>
      <form id="searchForm" className="search-form">
        <fieldset>
          <div className="form-group">
            <label htmlFor="table_name">Search by Mobile Number:</label>
            <input
              id="mobile_number"
              name="mobile_number"
              className="form-control"
              required={true}
              placeholder="Enter a customer's phone number"
              value={mobile_number.mobile_number}
              onChange={changeHandler}
            ></input>
          </div>
        </fieldset>

        <button
          className="btn btn-primary"
          type="submit"
          onClick={submitHandler}
        >
          Search By Number
        </button>
      </form>
    </>
  );
}
