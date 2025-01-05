import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="grid lg:grid-cols-[128px_1fr_100px] md:grid-cols-[128px_1fr] sm:grid-cols-1 border border-primary-800 gap-y-3">
      <div className="relative sm:h-32 h-44 aspect-square row-start-1">
        <Image
          fill
          src={image}
          alt={`Cabin ${name}`}
          className="object-cover border-r border-primary-800"
        />
      </div>

      <div className="flex-grow px-4 py-1.5 lg:px-6 lg:py-3 flex flex-col gap-2  row-start-1 lg:row-start-1 md:row-start-1 sm:row-start-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold ">
            {numNights} nights in
            <span className="whitespace-nowrap"> Cabin {name}</span>
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm sm:translate-x-0 - translate-x-3">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm  translate-x-6 -translate-y-6">
              upcoming
            </span>
          )}
        </div>

        <p className="lg:text-lg text-primary-300 flex flex-wrap sm:text-sm text-[.8rem] ">
          {format(new Date(startDate), "EEE, MMM dd yyyy")}
          <span className="sm:block hidden">
            (
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}
            )
          </span>
          &mdash;
          <span>{format(new Date(endDate), "EEE, MMM dd yyyy")}</span>
        </p>

        <div className="flex lg:flex-row flex-col gap-2  mt-auto items-baseline justify-between">
          <div className="flex items-center gap-5">
            <p className="text-xl font-semibold text-accent-400">
              ${totalPrice}
            </p>
            <p className="text-primary-300">&bull;</p>
            <p className="text-lg text-primary-300 whitespace-nowrap">
              {numGuests} guest{numGuests > 1 && "s"}
            </p>
          </div>
          <div>
            <p className="ml-auto text-sm text-primary-400">
              Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
            </p>
          </div>
        </div>
      </div>

      <div className="flex lg:flex-col flex-row border-l border-primary-800 w-[100px] lg:row-start-1 row-start-2 md:row-start-2 sm:row-start-3">
        {!isPast(startDate) ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation onDelete={onDelete} bookingId={id} />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
