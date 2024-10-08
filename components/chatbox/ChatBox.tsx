import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
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
import { FaWindows } from "react-icons/fa";
import ChatSettings from "./ChatSettings";
import { getCookie, getCookies } from "cookies-next";
import { cookies } from "next/headers";
import { getRankColor } from "@/utils/rankColors";

dotenv.config();

const getChatMessages = async () => {
  try {
    const res: Response = await fetch(getCurrentUrl() + "/externalApi/chat", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY_TOKEN!,
      },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch data");

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
          <Button variant="ghost" size="icon" disabled>
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
    <Card className=" max-w-[900px]">
      <CardHeader className="flex flex-row items-center justify-between p-6 border-b">
        <CardTitle>Chat</CardTitle>
        <ChatSettings />
      </CardHeader>
      <CardContent className="h-[300px] overflow-y-auto pt-3">
        <div className="flex flex-col space-y-4">
          {messages.map((message: IMessage) => (
            <div
              className="flex items-center justify-center gap-4"
              key={message._id}
            >
              <Avatar className="h-10 w-10 shrink-0 border ">
                <Image
                  src={message.user?.image || "/placeholder.svg"}
                  alt="Avatar"
                  width={40}
                  height={40}
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1 items-start">
                <div className="flex items-center justify-between ">
                  <div>
                    <Link
                      href={`/profile/${message.user?._id}` || "#"}
                      className={
                        "hover:underline text-xs sm:text-sm " +
                        getRankColor(message.user?.role)
                      }
                      prefetch={false}
                    >
                      {message.user?.name}
                    </Link>
                    <span className="ml-2 text-xs sm:text-sm text-gray-400">
                      {calculateTime(new Date(message.timestamp))}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-gray-400 text-xs sm:text-sm overflow-hidden break-all">
                  {message.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col w-full border-t p-6">
        {getCookie("displayTip", { cookies }) == "false" ? null : (
          <CardDescription className="mb-2 flex flex-row justify-start">
            Tip: Hit <FaWindows className="ml-2 mr-1 h-5 w-3" /> + "." for
            emotes
          </CardDescription>
        )}
        <ChatBoxForm session={session} />
      </CardFooter>
    </Card>
  );
}
