import { useHistory } from "react-router";
import { updateStatus } from "../utils/api";
//cancel button display and handler
export default function Cancel({ reservation }) {
  const history = useHistory();

  const cancelHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const confirmed = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    async function cancel() {
      if (confirmed)
        try {
          await updateStatus(
            reservation.reservation_id,
            "cancelled",
            abortController.signal
          );
          history.push(`/dashboard`);
        } catch (error) {
          console.log(error);
        }
    }
    cancel();
    return () => abortController.abort();
  };

  return (
    <>
      <button
        href={`/reservations/${reservation.reservation_id}/edit`}
        data-reservation-id-cancel={reservation.reservation_id}
        type="button"
        className="btn btn-primary"
        onClick={cancelHandler}
      >
        Cancel
      </button>
    </>
  );
}
