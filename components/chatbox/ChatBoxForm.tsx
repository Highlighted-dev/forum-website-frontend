"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { sendMessage } from "./SendMessageAction";
import { Session } from "next-auth";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export interface MessageFormValues {
  message: string;
}
export default function ChatBoxForm({ session }: { session: Session | null }) {
  const { register } = useForm<MessageFormValues>();
  return (
    <form
      action={(formData) => {
        sendMessage(formData, session);
      }}
      className="flex flex-col w-full"
    >
      <Textarea
        placeholder="Type your message..."
        {...register("message")}
        className="w-full rounded-md border text-white"
      />
      <div className="w-full mt-2 flex justify-end">
        <Button type="submit">Send</Button>
      </div>
    </form>
  );
}
