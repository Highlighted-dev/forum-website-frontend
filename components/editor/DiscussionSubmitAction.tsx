"use server";

import { getCurrentUrl } from "@/utils/getCurrentUrl";
import { Session } from "next-auth";
import dotenv from "dotenv";
dotenv.config();

export async function createDiscussion(
  title: string,
  content: string,
  session: Session | null
) {
  if (!session) {
    return {
      status: "error",
      message: "You must be logged in to send a message",
    };
  }
  await fetch(getCurrentUrl() + "/externalApi/discussion", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      content: content,
      username: session?.user?.name,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.API_KEY_TOKEN!,
    },
  });

  return {
    status: "success",
    message: `Discussion created, ${session?.user?.name}!`,
  };
}
