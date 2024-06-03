import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { getCurrentUrl } from "@/utils/getCurrentUrl";
import { calculateTime } from "@/utils/calculateTime";

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

    const data = (await res.json()) as any[];
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
          <Link href="#" prefetch={false}>
            View all
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="h-[400px] overflow-y-auto space-y-4 pt-3">
        {discussions?.map((discussion) => (
          <div className="flex items-start gap-4" key={discussion._id}>
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
                    {discussion.username}
                  </Link>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    {calculateTime(new Date(discussion.createdAt))}
                  </span>
                </div>
              </div>
              <Link
                href={`/discussions/${discussion._id}`}
                className="mt-2 block text-lg font-medium hover:underline"
                prefetch={false}
              >
                {discussion.title}
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
