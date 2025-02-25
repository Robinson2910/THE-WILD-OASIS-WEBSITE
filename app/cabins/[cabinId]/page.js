import Cabin from "@/_components/Cabin";
import Reservation from "@/_components/Reservation";
import Spinner from "@/_components/Spinner";
import {
  getCabin,
  getCabins,
} from "@/_lib/data-service";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}) {
  const { cabinId } = params;

  const cabin = await getCabin(cabinId);

  return {
    title: `Cabin ${cabin.name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins(); // Fetch all cabins
  return cabins.map((cabin) => ({
    cabinId: cabin.id.toString(), // Convert ID to a string
  }));
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  const { name } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div>
        <Cabin cabin={cabin} />
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
