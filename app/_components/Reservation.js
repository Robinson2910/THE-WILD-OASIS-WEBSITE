import {
  getBookedDatesByCabinId,
  getSettings,
} from "@/_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import LoginMessage from "./LoginMessage";
import { auth } from "@/_lib/auth";

async function Reservation({ cabin }) {
  const session = await auth();
  const [settings, bookedDates] =
    await Promise.all([
      getSettings(),
      getBookedDatesByCabinId(cabin.id),
    ]);
  return (
    <div className="grid grid-cols-2 border-primary-800 min-h-[400px]">
      {/* Components (DateSelector and
      ReservationForm) are client components.
      Recommended to fetch data server-side and
      pass as props for better performance and
      SEO. */}
      {/* From Supabase API: Settings: Minimum and
      maximum booking length. Booked Dates: To
      block unavailable dates. */}
      {/*From cabin Prices (for DateSelector). */}
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {/* From Cabin Data: Maximum Capacity (for
      ReservationForm). */}
      {session?.user ? (
        <ReservationForm
          cabin={cabin}
          user={session.user}
        />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
