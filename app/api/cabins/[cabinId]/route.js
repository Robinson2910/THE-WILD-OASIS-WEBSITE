import {
  getBookedDatesByCabinId,
  getCabin,
} from "@/_lib/data-service";

export async function GET(request, { params }) {
  try {
    const cabinId = params.cabinId;

    const [cabin, bookedDates] =
      await Promise.all([
        getCabin(cabinId),
        getBookedDatesByCabinId(cabinId),
      ]);

    return Response.json({ cabin, bookedDates });
  } catch (error) {
    return Response.json(
      { message: "Cabin not found" },
      { status: 404 }
    );
  }
}
