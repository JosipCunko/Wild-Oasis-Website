"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  //When successfully logged in with google provider, redirect to "/account"
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const nationalIDRegex = /^[a-zA-Z0-9]{6,12}$/;
  if (!nationalIDRegex.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updatedGuest = {
    nationality,
    nationalID,
    countryFlag,
  };

  const { error } = await supabase
    .from("guests")
    .update(updatedGuest)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

//Envoken in onClick handler
export async function deleteBooking(bookingId) {
  // await new Promise((res) => setTimeout(res, 2000));
  // throw new Error("Deleted cabin is back");

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  /*Extra protection => anyone in the network tab can access cURL to delete any bookings */
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  //Always in server actions if you want to reflect the UI to the latest changes
  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const reservationId = Number(formData.get("reservationId"));
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000);

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(reservationId))
    throw new Error("You are not allowed to edit this booking");

  const updatedBooking = {
    observations,
    numGuests,
  };

  const { error } = await supabase
    .from("bookings")
    .update(updatedBooking)
    .eq("id", Number(reservationId));

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${reservationId}`);
  redirect("/account/reservations");
}

//This is how you do it when using bind method and passing aditional data
//formData always the last one
export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  //Huge formData:
  //Object.entries(formData.entries())

  const newBooking = {
    ...bookingData,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    guestId: session.user.guestId,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function uploadRestaurantData(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  const mealName = formData.get("mealName");
  const price = Number(formData.get("price"));
  const ingredients = formData.get("ingredients");
  const image = formData.get("image");
  const type = formData.get("mealType");

  if (!mealName || !price || !ingredients || !image || !type) {
    throw new Error("Please provide all required fields");
  }

  // Upload image to storage bucket
  const imageName = `${Date.now()}-${mealName
    .toLowerCase()
    .replace(/\s+/g, "-")}.jpg`;
  const { error: uploadError } = await supabase.storage
    .from("restaurant")
    .upload(imageName, image);

  if (uploadError) {
    console.error(uploadError);
    throw new Error("Error uploading image");
  }

  // Get the public URL for the uploaded image
  const {
    data: { publicUrl },
  } = supabase.storage.from("restaurant").getPublicUrl(imageName);

  const { error: dbError } = await supabase.from("restaurant").insert([
    {
      mealName,
      price,
      ingredients,
      image: publicUrl,
      type,
    },
  ]);

  if (dbError) {
    console.error(dbError);
    throw new Error("Error uploading meal data");
  }

  revalidatePath("/restaurant");
}
