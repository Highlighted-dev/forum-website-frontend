import { getCookie } from "cookies-next";
import dotenv from "dotenv";
import { SettingsIcon } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { FaWindows } from "react-icons/fa";
import { auth } from "@/auth";
import { db } from "@/db";
import { calculateTime } from "@/utils/calculateTime";
import { getRankColor } from "@/utils/rankColors";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ChatBoxForm from "./ChatBoxForm";
import ChatSettings from "./ChatSettings";

dotenv.config();

const getChatMessages = async () => {
  try {
    const allMessages = await db.query.messages.findMany({
      with: {
        user: {
          with: {
            answers: true,
            discussions: true,
          },
        },
      },
      orderBy: (messages, { desc }) => [desc(messages.timestamp)],
    });
    if (!allMessages) throw new Error("Failed to fetch data");

    if (allMessages && allMessages.length > 50) {
      const messages = allMessages.slice(0, 50);
      return messages;
    }
    return allMessages
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
          {messages.map((message) => (
            <div
              className="flex items-center justify-center gap-4"
              key={message.id}
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
                      href={`/profile/${message.user?.id}` || "#"}
                      className={
                        "hover:underline text-xs sm:text-sm " +
                        getRankColor(message.user?.role || "")
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
