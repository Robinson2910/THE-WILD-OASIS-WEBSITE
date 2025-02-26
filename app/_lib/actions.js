"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut, auth } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  //2nd object is options and we use redirectTo property to reditect
  await signIn("google", {
    redirectTo: "/account",
  });
  // •	Redirects to /account after successful login.
}

export async function signOutAction() {
  //2nd object is options and we use redirectTo property to reditect
  await signOut("google", {
    redirectTo: "/",
  });
}

export async function updateProfile(formData) {
  const session = await auth();
  if (!session?.user?.email)
    throw new Error("Unauthorized");
  const guestID = session.user.guestId;
  console.log(`guestID ${guestID}`);
  // const [nationality, countryFlag] = [null, null];
  const [nationality, countryFlag] = formData
    .get("nationality")
    .split("%");
  console.log(`nationality ${nationality}`);

  const nationalID = formData.get("nationalID");

  // Validate National ID (6-12 alphanumeric characters)
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error(
      "Invalid National ID format."
    );
  }

  // Update guest data in Supabase
  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };
  console.log(updateData);
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", guestID)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}

export async function deleteReservation(
  bookingId
) {
  const session = await auth();

  if (!session)
    throw new Error("You must be logged in");
  const guestBookings = await getBookings(
    session.user.guestId
  );
  const guestBookingIds = guestBookings.map(
    (booking) => booking.id
  );
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error(
      "You are not allowed to delete this booking"
    );
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error)
    throw new Error(
      "Booking could not be deleted"
    );

  revalidatePath("account/reservations");
}

export async function updateBooking(formData) {
  const bookingId = Number(
    formData.get("bookingId")
  );
  // 1)Authentication
  const session = await auth();

  if (!session)
    throw new Error("You must be logged in");
  // 2)Authorization
  const guestBookings = await getBookings(
    session.user.guestId
  );
  const guestBookingIds = guestBookings.map(
    (booking) => booking.id
  );
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error(
      "You are not allowed to update this booking"
    );
  }
  //3)Building Update Data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData
      .get("observations")
      .slice(0, 1000),
  };
  // 4)Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  //error handling
  if (error) {
    console.error(error);
    throw new Error(
      "Booking could not be updated"
    );
  }
  //revalidation
  revalidatePath(
    `/account/reservations/edit/${bookingId}`
  );
  revalidatePath("/account/reservations");
  //redirecting
  redirect("/account/reservations");
}

export async function createBooking(
  bookingData,
  formData
) {
  const session = await auth();

  if (!session)
    throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData
      .get("observations")
      .slice(0, 1000),

    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  console.log(newBooking);

  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error(
      "Booking could not be created"
    );
  }

  //revalidate

  revalidatePath(
    `/cabins/${bookingData.cabinId}`
  );
  redirect("/cabins/thankyou");
}
