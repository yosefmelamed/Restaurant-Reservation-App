import { Link } from "react-router-dom";
//edit button component--used in resrevationList.js
export default function EditButton({ reservation_id }) {
  return (
    <>
      <Link to={`/reservations/${reservation_id}/edit`}>
        <button
          href={`/reservations/${reservation_id}/edit`}
          type="button"
          className="btn btn-primary"
        >
          Edit
        </button>
      </Link>
    </>
  );
}
