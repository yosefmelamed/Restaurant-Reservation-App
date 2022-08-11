import { useHistory } from "react-router";
export default function SearchForm({
  changeHandler,
  submitHandler,
  mobile_number,
}) {
  const history = useHistory();

  return (
    <>
      <form
        id="searchForm"
        className="container search-form d-flex flex-column"
      >
        <div className="form-group">
          <fieldset>
            <label htmlFor="table_name">Search by Mobile Number:</label>

            <input
              id="mobile_number"
              name="mobile_number"
              className="form-control my-2"
              required={true}
              placeholder="Enter a customer's phone number"
              value={mobile_number.mobile_number}
              onChange={changeHandler}
            ></input>
          </fieldset>
        </div>

        <div>
          <button
            className="btn btn-primary my-2"
            type="submit"
            onClick={submitHandler}
          >
            Search By Number
          </button>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
