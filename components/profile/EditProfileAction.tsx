"use server";

import { getCurrentUrl } from "@/utils/getCurrentUrl";
import { Session } from "next-auth";
import dotenv from "dotenv";
import { IEditProfileFormValues } from "./EditProfileForm";
import { unstable_update } from "@/auth";
dotenv.config();

export async function editProfileAction(
  data: IEditProfileFormValues,
  session: Session | null
) {
  if (!session) {
    return {
      status: "error",
      message: "You must be logged in to change your profile details",
    };
  }
  const body = {
    ...(data.name && { name: data.name }),
    ...(data.bio && { bio: data.bio }),
  };
  const response = await fetch(
    getCurrentUrl() + `/externalApi/user/${session.user.id}`,
    {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY_TOKEN!,
      },
    }
  );
  if (response.status == 200) {
    const updatedUser = {
      ...session.user,
      ...body,
    };
    //@ts-ignore - unstable_update seems to be wrongly typed
    await unstable_update(updatedUser);
    return {
      status: "Success",
      message: `Profile changed succesfully, ${updatedUser.name}!`,
    };
  } else {
    return {
      status: "Error",
      message: `Profile change failed, ${session?.user?.name}!`,
    };
  }
}
