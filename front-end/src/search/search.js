import React, { useState } from "react";
import MobileList from "../reservations/erservationList-mobile";
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
          results.forEach((result) => {
            result.reservation_date = result.reservation_date.substr(0, 10);
          });
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
    <div
      className="d-flex  justify-content-center text-center"
      style={{ marginTop: "40px" }}
    >
      <div>
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
          <div>
            <ReservationList reservations={searchResults} />
            <MobileList reservations={searchResults} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
