"use client";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "@/_lib/actions";

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] =
    useOptimistic(
      bookings, // Initial state (bookings passed from server)
      (currentBookings, bookingId) => {
        // Update function: Filters out the deleted booking optimistically
        return currentBookings.filter(
          (booking) => booking.id !== bookingId
        );
      }
    );

  const handleDelete = async (bookingId) => {
    // Optimistically update the UI
    //it is more like dispatch function,this dispatches this argument
    //to the function which is passed to useOptimistic
    //and based on current state it is update
    optimisticDelete(bookingId);

    // Perform the actual deletion (server action)
    try {
      await deleteReservation(bookingId); // Simulate async server action
    } catch (error) {
      // If the deletion fails, the state will automatically revert
      console.error("Deletion failed:", error);
    }
  };
  return (
    <ul className="space-y-6">
      {optimisticBookings?.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
