"use server";

import dotenv from "dotenv";
import { Session } from "next-auth";
import { db } from "@/db";
import { messages } from "@/db/schema";

dotenv.config();

const isMessageValid = (message: string): boolean => {
  // Allow any string between 1 and 5000 characters (including emojis and special chars)
  // Reject if message is only numeric
  return (
    typeof message === "string" &&
    message.length > 0 &&
    message.length <= 5000 &&
    !/^\d+$/.test(message)
  );
};

export async function sendMessage(data: FormData, session: Session | null) {
  if (!session) {
    return {
      status: "error",
      message: "You must be logged in to send a message",
    };
  }
  const rawMessage = data.get("message");
  // If not a string, treat as missing/required
  if (typeof rawMessage !== "string") {
    return {
      status: "Error",
      message: "Message is required",
    };
  }
  if (!rawMessage.trim()) {
    return {
      status: "Error",
      message: "Message is required",
    };
  }
  if (!isMessageValid(rawMessage)) {
    return {
      status: "Error",
      message: "Message is invalid",
    };
  }
  await db.insert(messages).values({
    userId: session.user.id,
    content: rawMessage,
  });

  return {
    status: "Success",
    message: `Message sent, ${session?.user?.name}!`,
  };
}