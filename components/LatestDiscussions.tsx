import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { getCurrentUrl } from "@/utils/getCurrentUrl";
import { calculateTime } from "@/utils/calculateTime";
import { IDiscussion } from "@/@types/discussion";
import { Badge } from "./ui/badge";

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
      }
    );

    const data = (await res.json()) as IDiscussion[];
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-6 border-b">
        <CardTitle>Latest Discussions</CardTitle>
        <Button variant="ghost">
          <Link href="/discussions" prefetch={false}>
            View all
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="h-[440px] overflow-y-hidden space-y-4 pt-3 max-w-full overflow-x-hidden">
        {discussions?.map((discussion) => (
          <div
            className="flex items-start justify-center gap-4"
            key={discussion._id}
          >
            <Avatar className="h-16 w-16 shrink-0 border">
              <img
                src={discussion.user?.image || "/placeholder.svg"}
                alt="Avatar"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 justify-center ">
              <div className="flex items-center">
                <div>
                  <Link
                    href="#"
                    className="font-medium text-blue-500 hover:underline"
                    prefetch={false}
                  >
                    {discussion.user?.name}
                  </Link>
                  <Link href="#" className="ml-2 text-sm text-gray-500">
                    in <Badge>{discussion.category || ""}</Badge>
                  </Link>
                </div>
              </div>
              <div className="mt-[-4px]">
                <span className=" text-xs text-gray-400">
                  {calculateTime(new Date(discussion.createdAt))}
                </span>
              </div>
              <Link
                href={`/discussions/${discussion._id}`}
                className="text-base font-medium hover:underline"
                prefetch={false}
              >
                {discussion.title.length > 30
                  ? discussion.title.slice(0, 30) + "..."
                  : discussion.title}
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
