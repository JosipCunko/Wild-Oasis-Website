"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  /*
 Mark a state update as a transition (using useTransition)
 State update will happen without blocking the UI
 UI will stay responsive during re-rendering, state transition is happening in the background (non-blocking) => indicator
 */
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?"))
      startTransition(() => {
        onDelete(bookingId);
      });
  }

  return (
    <button
      //Server actions in client components
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
      disabled={isPending}
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <>
          <span className="mx-auto">
            <SpinnerMini />
          </span>
          <span>Deleting</span>
        </>
      )}
    </button>
  );
}

export default DeleteReservation;
