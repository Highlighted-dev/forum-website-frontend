import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Link from "next/link";
import { SettingsIcon } from "lucide-react";
import { auth } from "@/auth";
import ChatBoxForm from "./ChatBoxForm";
import { getCurrentUrl } from "@/utils/getCurrentUrl";
import { IMessage } from "@/@types/message";

const getChatMessages = async () => {
  const res = await fetch(getCurrentUrl() + "/externalApi/chat", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.API_KEY_TOKEN!,
    },
  });

  return res.json();
};

const calculateTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else {
    return `${diffDays} days ago`;
  }
};

export default async function ChatBox() {
  const session = await auth();
  const messages = await getChatMessages();
  if (!session || !messages)
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
            <div className="flex items-center gap-4">
              <p>Couldnt fetch any messages</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
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
          {messages.map((message: IMessage) => (
            <div className="flex items-start gap-4" key={message._id}>
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
                      {message.username}
                    </Link>
                    <span className="ml-2 text-sm text-gray-400">
                      {calculateTime(new Date(message.timestamp))}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-gray-400">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col w-full border-t p-6">
        <ChatBoxForm session={session} />
      </CardFooter>
    </Card>
  );
}
