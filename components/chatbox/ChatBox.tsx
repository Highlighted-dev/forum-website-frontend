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
import dotenv from "dotenv";
import Image from "next/image";
import { calculateTime } from "@/utils/calculateTime";

dotenv.config();

const getChatMessages = async () => {
  try {
    const res: Response = await fetch(getCurrentUrl() + "/externalApi/chat", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY_TOKEN!,
      },
    });

    const data = (await res.json()) as IMessage[];
    if (data && data.length > 50) {
      const messages = data.slice(0, 50);
      messages.reverse();
      return messages;
    }
    return data.reverse();
  } catch (e) {
    console.log(e);
    return null;
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
              <p>
                {!session
                  ? `You must be logged in to send a message`
                  : `Couldnt fetch messages`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-6 border-b">
        <CardTitle>Chat</CardTitle>
        <Button variant="ghost" size="icon" disabled>
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="h-[300px] overflow-y-auto pt-3">
        <div className="space-y-4">
          {messages.map((message: IMessage) => (
            <div className="flex items-start gap-4" key={message._id}>
              <Avatar className="h-10 w-10 shrink-0 border">
                <Image
                  src={message.user?.image || "/placeholder.svg"}
                  alt="Avatar"
                  width={40}
                  height={40}
                />
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
                      {message.user?.name}
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
