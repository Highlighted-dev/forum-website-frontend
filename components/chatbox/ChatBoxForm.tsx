"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { sendMessage } from "./SendMessageAction";
import { Session } from "next-auth";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ImSpinner2 } from "react-icons/im";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

export interface MessageFormValues {
  message: string;
}

export default function ChatBoxForm({ session }: { session: Session | null }) {
  const { register, handleSubmit, reset } = useForm<MessageFormValues>();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const onSubmit = async (formData: MessageFormValues) => {
    setLoading(true);
    const data = new FormData();
    data.append("message", formData.message);

    try {
      await sendMessage(data, session);
      reset(); // Reset form fields after successful submission
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setLoading(false);
      toast({
        title: "Message sent",
        description: "Your message has been sent. It will appear soon...",
      });
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <Textarea
        placeholder="Type your message..."
        {...register("message")}
        className="w-full rounded-md border text-white"
      />
      <div className="w-full mt-2 flex justify-end">
        <Button type="submit">
          {loading ? (
            <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Send"
          )}
        </Button>
      </div>
    </form>
  );
}
