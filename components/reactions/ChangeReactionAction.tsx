"use server";

import dotenv from "dotenv";
import { eq } from "drizzle-orm";
import { Session } from "next-auth";
import { db } from "@/db";
import { answerReactions, discussionReactions, discussions } from "@/db/schema";

dotenv.config();

export async function changeReaction(
  reaction: string,
  id: number,
  session: Session | null,
  answerId?: number,
) {
  if (!session) {
    return {
      status: "error",
      message: "You must be logged in to change reaction",
    };
  }
  if (!answerId) {
    const discussion = await db.query.discussions.findFirst({
      where: eq(discussions.id, id),
      with: {
        reactions: true,
      },
    });
    if (!discussion) {
      return {
        status: "error",
        message: "Discussion not found",
      };
    }

    const reactionExists = discussion.reactions.some(
      (r) => r.userId === session.user.id
    );
    if (reactionExists) {
      await db
        .update(discussionReactions)
        .set({
          reaction: reaction,
          userId: session.user.id,
        })
        .where(eq(discussionReactions.id, id));
    } else {
      await db.insert(discussionReactions).values({
        reaction: reaction,
        userId: session.user.id,
        discussionId: id,
      });
    }
  } else {
    const answer = await db.query.answers.findFirst({
      where: eq(answerReactions.id, answerId),
      with: {
        reactions: true,
      },
    });
    if (!answer) {
      return {
        status: "error",
        message: "Answer not found",
      };
    }
    const reactionExists = answer.reactions.some(
      (r) => r.userId === session.user.id,
    );
    if (reactionExists) {
    await db
      .update(answerReactions)
      .set({
        reaction: reaction,
        userId: session.user.id,
      })
      .where(eq(answerReactions.id, answerId));
    } else {
      await db.insert(answerReactions).values({
        reaction: reaction,
        userId: session.user.id,
        answerId: answerId,
      });
    }
  }

  return {
    status: "Success",
    message: `Reaction saved, ${session?.user?.name}!`,
  };
}
