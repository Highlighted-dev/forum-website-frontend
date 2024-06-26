import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { getCurrentUrl } from "@/utils/getCurrentUrl";
import { calculateTime } from "@/utils/calculateTime";
import { IDiscussion } from "@/@types/discussion";
import { Badge } from "./ui/badge";
import { getRankColor } from "@/utils/rankColors";
import Image from "next/image";

const getLatestDiscussions = async () => {
  try {
    const res: Response = await fetch(
      getCurrentUrl() + "/externalApi/discussion",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_KEY_TOKEN!,
        },
        cache: "no-store",
      }
    );

    const data = ((await res.json()) as IDiscussion[]).reverse();
    if (data && data.length > 5) {
      const discussions = data.slice(0, 5);
      return discussions;
    }
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default async function LatestDiscussions() {
  const discussions = await getLatestDiscussions();
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between p-6 border-b">
        <CardTitle>Latest Discussions</CardTitle>
        <Link href="/discussions" prefetch={false}>
          <Button variant="ghost">View all</Button>
        </Link>
      </CardHeader>
      <CardContent className="h-[500px] space-y-6 pt-3 max-w-full overflow-x-hidden flex flex-col">
        {discussions?.map((discussion) => (
          <div
            className="flex flex-row items-start justify-center gap-4"
            key={discussion._id}
          >
            <Avatar className="sm:h-16 sm:w-16 h-10 w-10 shrink-0 border">
              <Image
                src={discussion.user?.image || "/placeholder.svg"}
                alt="Avatar"
                width={64}
                height={64}
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 justify-center ">
              <Link
                href={`/discussions/${discussion._id}`}
                className="text-sm font-medium hover:underline text-ellipsis overflow-hidden "
                prefetch={false}
              >
                {discussion.title}
              </Link>
              <div>
                <Link
                  href={`/discussions/category/${discussion.category}`}
                  className="text-xs text-gray-500"
                >
                  {discussion.category}
                </Link>
              </div>
              <div className="flex items-center ">
                <Link
                  href={`/profile/${discussion.user?._id}`}
                  className={`font-medium ${getRankColor(
                    discussion.user?.role || ""
                  )} hover:underline text-xs sm:text-sm`}
                  prefetch={false}
                >
                  {discussion.user?.name}
                </Link>
                <span className=" ml-2 text-xs sm:text-sm text-center text-gray-400">
                  {calculateTime(new Date(discussion.createdAt))}
                </span>
              </div>
            </div>
            <div>
              <Badge>{discussion.answers.length} replies</Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
