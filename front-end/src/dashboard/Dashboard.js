import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import { previous, next, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "../reservations/reservationList";
import { listTables } from "../utils/api";
import useQuery from "../utils/useQuery";
import TableList from "../tables/tableList";
import Clock from "./clock";
import { resetTables } from "../utils/api";
import "../layout/Layout.css";
import MobileList from "../reservations/erservationList-mobile";
import TablesMobileList from "../tables/tableListMobile";
import BackgroungPictures from "./backgroundPicture";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const history = useHistory();

  const query = useQuery().get("date");
  if (query) date = query;

  const dateObject = new Date(`${date} MST`);
  const dateString = dateObject.toDateString();

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDashboard() {
      try {
        const reservation = await listReservations(
          { date },
          abortController.signal
        );
        setReservations(reservation);
      } catch (error) {
        setReservations([]);
      }
    }
    loadDashboard();
    return () => abortController.abort();
  }, [date]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadTables() {
      try {
        const tables = await listTables(abortController.signal);
        setTables(tables);
      } catch (error) {
        setTables([]);
      }
    }
    loadTables();
    return () => abortController.abort();
  }, []);

  const resetHandler = (event) => {
    event.preventDefault();
    const ids = event.target.value.split(",");
    const tableId = Number(ids[0]);
    const confirmed = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    const abortController = new AbortController();
    async function resetSeating() {
      if (confirmed) {
        try {
          await resetTables(tableId, null, abortController.signal);
          history.go(0);
        } catch (error) {
          setReservationsError(error);
        }
      }
    }
    resetSeating();
    return () => abortController.abort();
  };

  return (
    <main>
      <div className="container-fluid d-flex flex-column">
        <h1 className="text-center my-3">Dashboard</h1>
        <div className="header-line">
          <div className="d-md-flex  mb-3">
            <h5 className="text-center mb-0">Reservations for: {dateString}</h5>
          </div>
          <div className="d-md-flex  mb-3">
            <h5 className="mb-0 text-center">
              <Clock />
            </h5>
          </div>
        </div>
        <hr
          style={{ width: "100%", height: "2px", background: "#393a44" }}
        ></hr>

        <ErrorAlert error={reservationsError} />
        <ReservationList reservations={reservations} />
        <MobileList reservations={reservations} />
        <TableList tables={tables} resetHandler={resetHandler} />
        <h3
          className="d-lg-none"
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          Tables:
        </h3>
        <TablesMobileList tables={tables} resetHandler={resetHandler} />
        <div className="text-center">
          <button
            style={{ width: "120px" }}
            className="btn btn-secondary mr-2"
            onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
          >
            Previous
          </button>
          <button
            style={{ width: "120px", margin: "40px" }}
            className="btn btn-secondary mr-2"
            onClick={() => history.push(`/dashboard?date=${today()}`)}
          >
            Today
          </button>
          <button
            style={{ width: "120px", margin: "40px" }}
            className="btn btn-secondary mr-2"
            onClick={() => history.push(`/dashboard?date=${next(date)}`)}
          >
            Next
          </button>
        </div>
        <BackgroungPictures />
      </div>
    </main>
  );
}

export default Dashboard;
