"use server";

import dotenv from "dotenv";
import { eq } from "drizzle-orm";
import { Session } from "next-auth";
import { db } from "@/db";
import { answers, discussions } from "@/db/schema";

dotenv.config();

const isDiscussionTitleValid = (title: string): boolean => {
  // Title must be at least 4 characters long and maximum 75 characters long.
  // Title must contain only alphanumeric characters, spaces, special characters and emojis (ex. ♿🔥).
  const titleRegex =
    /^[a-zA-Z0-9\s!@#()<>_.:=#,;'"?/\]\[\uD83C-\uDBFF\uDC00-\uDFFFĄąĆćĘęŁłŃńÓóŚśŹźŻż:\-–—]{1,80}$/;

  return titleRegex.test(title);
};

export async function createPost(
  content: string,
  session: Session | null,
  url: string,
  id?: number,
  title?: string,
  category?: string,
) {
  if (!session) {
    return {
      status: "error",
      message: "You must be logged in to send a message",
    };
  }

  if (!content || typeof content !== "string") {
    return {
      status: "error",
      message: "Content is required",
    };
  }
  if (content.length < 1 || content.length > 5000) {
    return {
      status: "error",
      message: "Content must be between 1 and 5000 characters",
    };
  }
  if (title && !isDiscussionTitleValid(title)) {
    return {
      status: "error",
      message:
        "Title contains invalid characters or is too short/long (1-80 characters)",
    };
  }
  if (category && (category.length < 1 || category.length > 50)) {
    return {
      status: "error",
      message: "Category must be between 1 and 50 characters",
    };
  }
  let data;
  if (id) {
    // it means we are adding a reply to an existing discussion
    const post = await db.query.discussions.findFirst({
      where: eq(discussions.id, id),
    });
    if (!post) {
      return {
        status: "error",
        message: "Discussion not found, cant add reply",
      };
    }
    if (post.closed) {
      return {
        status: "error",
        message: "Discussion is locked, cant add reply",
      };
    }
    await db.insert(answers).values({
      userId: session.user.id,
      discussionId: id,
      content: content,
    });
  } else {
    if (!title || title.length < 1 || title.length > 80) {
      return {
        status: "error",
        message: "Title is required and must be between 1 and 80 characters",
      };
    }
    data = await db
      .insert(discussions)
      .values({
        userId: session.user.id,
        content: content,
        title: title,
        category: category || "",
      })
      .returning();
  }

  return {
    status: "success",
    message: `Discussion created, ${session?.user?.name}!`,
    discussion_id: id || data?.[0]?.id,
  };
}
