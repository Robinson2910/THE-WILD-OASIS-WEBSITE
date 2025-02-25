import CabinList from "@/_components/CabinList";
import Spinner from "@/_components/Spinner";
import Filter from "@/_components/Filter";
import { Suspense } from "react";
import ReservationReminder from "@/_components/ReservationReminder";

export const metadata = {
  title: "Cabins",
};
export const revalidate = 0;

export default async function Page({
  searchParams,
}) {
  const filter = searchParams?.capacity ?? "all";
  console.log(filter);
  // // CHANGE
  // const cabins = await getCabins();

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right
        in the heart of the Italian Dolomites.
        Imagine waking up to beautiful mountain
        views, spending your days exploring the
        dark forests around, or just relaxing in
        your private hot tub under the stars.
        Enjoy natures beauty in your own little
        home away from home. The perfect spot for
        a peaceful, calm vacation. Welcome to
        paradise.
      </p>
      <Filter />
      <Suspense
        fallback={<Spinner />}
        key={filter}
      >
        {" "}
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
