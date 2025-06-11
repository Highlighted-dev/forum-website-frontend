"use server";

import dotenv from "dotenv";
import { eq } from "drizzle-orm";
import { Session } from "next-auth";
import { db } from "@/db";
import { discussions } from "@/db/schema";

dotenv.config();

export async function lockDiscussion(
  closing: string,
  id: number,
  session: Session | null,
) {
  if (!session) {
    return {
      status: "error",
      message: "You must be logged in to send a message",
    };
  }

  if (!closing || (closing !== "true" && closing !== "false")) {
    return {
      status: "error",
      message: "Invalid closing value. It must be 'true' or 'false'.",
    };
  }

  await db
    .update(discussions)
    .set({ closed: closing === "true" })
    .where(eq(discussions.id, id));

  return {
    status: "Success",
    message: `Thread ${closing == "true" ? "closed" : "opened"}, ${
      session?.user?.name
    }!`,
  };
}
