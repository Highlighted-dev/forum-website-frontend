"use server";

import { getCurrentUrl } from "@/utils/getCurrentUrl";
import { Session } from "next-auth";
import dotenv from "dotenv";
dotenv.config();

export async function sendMessage(data: FormData, session: Session | null) {
  if (!session) {
    return {
      status: "error",
      message: "You must be logged in to send a message",
    };
  }
  await fetch(getCurrentUrl() + "/externalApi/chat", {
    method: "POST",
    body: JSON.stringify({
      content: data.get("message"),
      username: session?.user?.name,
      icon: session?.user?.image || "",
    }),
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.API_KEY_TOKEN!,
    },
  });

  return {
    status: "success",
    message: `Message sent, ${session?.user?.name}!`,
  };
}
