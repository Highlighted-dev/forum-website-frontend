"use client";
import { InferSelectModel } from "drizzle-orm";
import { Lock, Unlock } from "lucide-react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import React from "react";
import { useForm } from "react-hook-form";
import { discussions } from "@/db/schema";
import { lockDiscussion } from "./LockDiscussionAction";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

export default function LockDiscussionForm({
  session,
  discussion,
}: {
  session: Session | null;
  discussion: InferSelectModel<typeof discussions>;
}) {
  const { handleSubmit } = useForm();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [closing, setClosing] = React.useState(false);
  const onSubmit = async () => {
    setLoading(true);
    let result;
    try {
      result = await lockDiscussion(closing.toString(), discussion.id, session);
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setLoading(false);
      toast({
        title: result?.status,
        description: result?.message,
      });
      router.refresh();
    }
  };
  return session?.user.role === "Ekipa TTT" && !discussion.closed ? (
    <form
      className="flex justify-end items-end"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Button type="submit" disabled={loading} onClick={() => setClosing(true)}>
        <Lock className="mr-1" />
      </Button>
    </form>
  ) : session?.user.role === "Ekipa TTT" ? (
    <form
      className="flex justify-end items-end"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Button
        type="submit"
        disabled={loading}
        onClick={() => setClosing(false)}
      >
        <Unlock className="mr-1" />
      </Button>
    </form>
  ) : null;
}
