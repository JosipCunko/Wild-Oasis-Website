"use client";

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

function ReservationProvider({ children }) {
  const [range, setRange] = useState({
    from: undefined,
    to: undefined,
  });

  console.log(range);

  return (
    <ReservationContext.Provider value={{ range, setRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error(
      "Reservation context was used outside of ReservationProvider"
    );
  return context;
}

export default ReservationProvider;
