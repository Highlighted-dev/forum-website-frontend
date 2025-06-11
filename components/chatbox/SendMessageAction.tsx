"use server";

import dotenv from "dotenv";
import { Session } from "next-auth";
import { db } from "@/db";
import { messages } from "@/db/schema";

dotenv.config();

const isMessageValid = (message: string): boolean => {
  // Message must be at least 1 character long and maximum 500 characters long.
  // Message must contain only alphanumeric characters, spaces, special characters and emojis (ex. ♿🔥).
  const messageRegex =
    /^[a-zA-Z0-9\s!@#()<>_.:=#,;'"?/\]\[\uD83C-\uDBFF\uDC00-\uDFFFĄąĆćĘęŁłŃńÓóŚśŹźŻż:\-–—]{1,5000}$/;

  return messageRegex.test(message);
};

export async function sendMessage(data: FormData, session: Session | null) {
  if (!session) {
    return {
      status: "error",
      message: "You must be logged in to send a message",
    };
  }
  if (!data.get("message") || typeof data.get("message") !== "string") {
    return {
      status: "Error",
      message: "Message is required",
    };
  }
  if (!isMessageValid(data.get("message") as string)) {
    return {
      status: "Error",
      message: "Message is invalid",
    };
  }
  const message = data.get("message") as string;
  await db.insert(messages).values({
    userId: session.user.id,
    content: message,
  });

  return {
    status: "Success",
    message: `Message sent, ${session?.user?.name}!`,
  };
}
