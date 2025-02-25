"use client";
import { useState } from "react";

import { updateProfile } from "@/_lib/actions";
import { SubmitButton } from "./SubmitButton";

//summary of this component

//from the server component(page.js )

//we get the logged in user's email
//using that we get guest details
//and pass it to this update profile form

//using the data we got we populate some of the input fields like the full name and email adress

//if user select any new country
//and national id

//we use server actions to handle the submission of it in server

//so we passin the server action as the action prop

//and in the server action we update the database

//now since the database is updated

//it will reflect in our page

//but it takes time to reflect because of the cache

function UpdateProfileForm({ children, guest }) {
  const [count, setCount] = useState();
  // CHANGE
  console.log(guest);
  const countryFlag = guest.countryFlag;
  const nationality = guest.nationality;

  return (
    <form
      action={updateProfile}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          name="fullName"
          defaultValue={guest.fullName}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          name="email"
          defaultValue={guest.email}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">
            Where are you from?
          </label>
          <img
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">
          National ID number
        </label>
        <input
          name="nationalID"
          defaultValue={guest.nationalID}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel="updating">
          Update Profile
        </SubmitButton>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
