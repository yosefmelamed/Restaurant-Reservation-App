import React, { useState } from "react";
import ReservationList from "../reservations/reservationList";
import { getByPhoneNumber } from "../utils/api";
const { default: SearchForm } = require("./searchForm");
//handles a search request and either displays a no-match message or the results using reservationsList.js
function Search() {
  const initialFormState = {
    mobile_number: "",
  };
  const [mobile_number, setMobileNumber] = useState({ ...initialFormState });
  const [searchResults, setSearchResults] = useState([]);
  const changeHandler = ({ target }) => {
    let value = target.value;

    setMobileNumber({
      ...mobile_number,
      [target.name]: value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    async function getByNumber() {
      try {
        const results = await getByPhoneNumber(
          mobile_number,
          abortController.signal
        );
        if (results.length) {
          setSearchResults(results);
        } else {
          setSearchResults("none");
        }
      } catch (error) {
        console.log(error);
      }
    }
    getByNumber();
    return () => abortController.abort();
  };

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <SearchForm
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        mobile_number={mobile_number}
      />
      {searchResults === "none" ? (
        <h4 style={{ marginTop: "30px", color: "#393a44" }}>
          No reservations found.
        </h4>
      ) : (
        <ReservationList reservations={searchResults} />
      )}
    </div>
  );
}

export default Search;
