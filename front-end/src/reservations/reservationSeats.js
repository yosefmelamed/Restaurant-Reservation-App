import { Link } from "react-router-dom";
//seats button-links to the /reservations/reservation_id/seat page
export default function Seats({ reservation_id }) {
  return (
    <>
      <Link to={`/reservations/${reservation_id}/seat`}>
        <button
          href={`/reservations/${reservation_id}/seat`}
          type="button"
          className="btn btn-primary"
        >
          Seat
        </button>
      </Link>
    </>
  );
}
