"use client";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../_lib/actions";

function ReservationList({ bookings }) {
  /* Data will be put back if the operation wasnt successful 
  bookings => current state, state while there is no async operation running
  updateFn(curState,infoPassedInDeleteFn) => sets next optimistic state
  optimisticBookings => optimistic state, in the beggining == bookings
  optimisticDelete => whenever user clicks deleteBtn, reservation is deleted immmediately from the UI, function that triggers the optimistic operation
*/

  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingId) => {
      return currentBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
