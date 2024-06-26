"use server";

import { getCurrentUrl } from "@/utils/getCurrentUrl";
import { Session } from "next-auth";
import dotenv from "dotenv";
dotenv.config();

export async function lockDiscussion(
  closing: string,
  _id: string,
  session: Session | null
) {
  if (!session) {
    return {
      status: "error",
      message: "You must be logged in to send a message",
    };
  }
  const res = await fetch(getCurrentUrl() + `/externalApi/discussion/${_id}`, {
    method: "PUT",
    body: JSON.stringify({
      closing: closing,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.API_KEY_TOKEN!,
    },
  });
  if (!res.ok) {
    const data = await res.json();
    return {
      status: "Error",
      message: data.error,
    };
  }

  return {
    status: "Success",
    message: `Thread ${closing == "true" ? "closed" : "opened"}, ${
      session?.user?.name
    }!`,
  };
}
