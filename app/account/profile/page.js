import ReservationForm from "@/_components/ReservationForm";
import SelectCountry from "@/_components/SelectCountry";
import UpdateProfileForm from "@/_components/UpdateProfileForm";
import { auth } from "@/_lib/auth";
import { getGuest } from "@/_lib/data-service";

export const metadata = {
  title: "Update Profile",
};

//this becomes a dynamic page beacuse we get auth(),which includes cookies

export default async function Page() {
  const session = await auth(); // Get session data
  const email = session?.user?.email;
  const guest = await getGuest(email);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will
        make your check-in process faster and
        smoother. See you soon!
      </p>

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
