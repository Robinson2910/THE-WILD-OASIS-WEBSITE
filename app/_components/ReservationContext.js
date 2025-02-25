"use client";
const {
  createContext,
  useState,
  useContext,
} = require("react");

const ReservationContext = createContext();

export const ReservationProvider = ({
  children,
}) => {
  const [range, setRange] = useState({
    from: undefined,
    to: undefined,
  });

  const resetRange = () => {
    console.log("clearing");

    setRange({
      from: undefined,
      to: undefined,
    });
  };

  return (
    <ReservationContext.Provider
      value={{ range, setRange, resetRange }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error(
      "useReservation must be used within a ReservationProvider"
    );
  }
  return context;
};
