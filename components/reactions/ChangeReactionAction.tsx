"use server";

import { getCurrentUrl } from "@/utils/getCurrentUrl";
import { Session } from "next-auth";
import dotenv from "dotenv";
dotenv.config();

export async function changeReaction(
  reaction: string,
  id: string,
  session: Session | null,
  answerId?: string
) {
  if (!session) {
    return {
      status: "error",
      message: "You must be logged in to change reaction",
    };
  }
  const res = await fetch(
    getCurrentUrl() + `/externalApi/discussion/${id}/reactions`,
    {
      method: "PUT",
      body: JSON.stringify({
        reaction: reaction,
        user: session?.user,
        answerId: answerId,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY_TOKEN!,
      },
    }
  );
  if (!res.ok) {
    const data = await res.json();
    return {
      status: "Error",
      message: data.error,
    };
  }

  return {
    status: "Success",
    message: `Reaction changed, ${session?.user?.name}!`,
  };
}
