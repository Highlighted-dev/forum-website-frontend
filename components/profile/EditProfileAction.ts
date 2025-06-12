"use server";

import dotenv from "dotenv";
import { eq } from "drizzle-orm";
import { Session } from "next-auth";
import { unstable_update } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { IEditProfileFormValues } from "./EditProfileForm";

dotenv.config();

const isUsernameValid = (username: string): boolean => {
  // Username must be at least 4 characters long and maximum 22 characters long
  // Username must contain only alphanumeric characters and these special characters: !@#()_.
  const usernameRegex = /^[a-zA-Z0-9!@#()_.]{4,22}$/;
  return usernameRegex.test(username);
};

export async function editProfileAction(
  data: IEditProfileFormValues,
  session: Session | null,
) {
  if (!session) {
    return {
      status: "error",
      message: "You must be logged in to change your profile details",
    };
  }
  if (!data || typeof data !== "object") {
    return {
      status: "error",
      message: "Invalid data provided for profile update",
    };
  }
  if (data.name && !isUsernameValid(data.name)) {
    return {
      status: "error",
      message:
        "Username must be between 4 and 22 characters long and can only contain alphanumeric characters and these special characters: !@#()_.",
    };
  }
  if (typeof data.bio === "string" && (data.bio.length < 1 || data.bio.length > 500)) {
    return {
      status: "error",
      message: "Bio must be between 1 and 500 characters",
    };
  }

  await db
    .update(users)
    .set({
      name: data.name,
      bio: data.bio,
    })
    .where(eq(users.id, session.user.id));
  const updatedUser = {
    ...session.user,
    ...data,
  };
  //@ts-ignore - unstable_update seems to be wrongly typed
  await unstable_update(updatedUser);
  return {
    status: "Success",
    message: `Profile changed succesfully, ${data.name}!`,
  };
}
