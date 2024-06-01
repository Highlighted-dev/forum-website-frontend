"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import { SettingsIcon } from "lucide-react";
import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import { sendMessage } from "./SendMessageAction";

export interface MessageFormValues {
  message: string;
}

export default function ChatBox({ session }: { session: Session | null }) {
  const { register } = useForm<MessageFormValues>();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-6 border-b">
        <CardTitle>Chat</CardTitle>
        <Button variant="ghost" size="icon">
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="h-[300px] overflow-y-auto pt-3">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10 shrink-0 border">
              <img src="/placeholder.svg" alt="Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <Link
                    href="#"
                    className="font-medium text-blue-500 hover:underline"
                    prefetch={false}
                  >
                    John Doe
                  </Link>
                  <span className="ml-2 text-sm text-gray-400">
                    2 minutes ago
                  </span>
                </div>
              </div>
              <p className="mt-2 text-gray-400">
                Hey everyone, just wanted to let you know that the latest update
                to the forum software is now live. Let me know if you have any
                issues.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10 shrink-0 border">
              <img src="/placeholder.svg" alt="Avatar" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <Link
                    href="#"
                    className="font-medium text-blue-500 hover:underline"
                    prefetch={false}
                  >
                    Sarah Anderson
                  </Link>
                  <span className="ml-2 text-sm text-gray-400">
                    5 minutes ago
                  </span>
                </div>
              </div>
              <p className="mt-2 text-gray-400">
                Thanks for the update, John. I'm excited to try out the new
                features!
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10 shrink-0 border">
              <img src="/placeholder.svg" alt="Avatar" />
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <Link
                    href="#"
                    className="font-medium text-blue-500 hover:underline"
                    prefetch={false}
                  >
                    Michael Johnson
                  </Link>
                  <span className="ml-2 text-sm text-gray-400">
                    10 minutes ago
                  </span>
                </div>
              </div>
              <p className="mt-2 text-gray-400">
                Great to hear, Sarah. Let me know if you have any questions or
                issues.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col w-full border-t p-6">
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
      </CardFooter>
    </Card>
  );
}
