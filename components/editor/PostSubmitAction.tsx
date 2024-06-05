"use server";

import { getCurrentUrl } from "@/utils/getCurrentUrl";
import { Session } from "next-auth";
import dotenv from "dotenv";
dotenv.config();

export async function createPost(
  content: string,
  session: Session | null,
  url: string,
  _id?: string,
  title?: string,
  category?: string
) {
  if (!session) {
    return {
      status: "error",
      message: "You must be logged in to send a message",
    };
  }

  const body = {
    content: content,
    username: session?.user?.name,
    ...(_id && { _id: _id }),
    ...(title && { title: title }),
    ...(category && { category: category }),
  };
  console.log(body);

  await fetch(getCurrentUrl() + url, {
    method: "POST",
    body: JSON.stringify(body),
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
