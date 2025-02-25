"use client";
import { deleteReservation } from "@/_lib/actions";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({
  bookingId,
  onDelete,
}) {
  const [isPending, startTransition] =
    useTransition();

  const handleDelete = (bookingId) => {
    if (
      confirm(
        "are u sure u want to delete this reservation"
      )
    )
      startTransition(() =>
        deleteReservation(bookingId)
      );
  };
  return (
    <button
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
      onClick={() => onDelete(bookingId)}
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <SpinnerMini />
      )}
    </button>
  );
}

export default DeleteReservation;
