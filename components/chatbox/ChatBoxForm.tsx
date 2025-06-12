"use client";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import React from "react";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { sendMessage } from "./sendMessageAction";
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
    let result;
    try {
      result = await sendMessage(data, session);
      reset(); // Reset form fields after successful submission
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <Textarea
        placeholder="Type your message..."
        {...register("message")}
        className="w-full rounded-md border text-white"
      />
      <div className="w-full mt-2 flex justify-end">
        <Button type="submit" variant="default" disabled={loading}>
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
