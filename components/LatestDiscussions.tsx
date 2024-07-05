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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

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

const getLatestReplies = (discussions: IDiscussion[] | null) => {
  if (!discussions) return null;
  // Get every reply and its parent discussion
  const repliesWithDiscussion = discussions
    .map((discussion) =>
      discussion.answers.map((answer) => ({
        ...answer,
        discussionId: discussion._id,
        discussionTitle: discussion.title,
        discussionCategory: discussion.category,
        discussionAnswersLength: discussion.answers.length,
      }))
    )
    .flat()
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  if (repliesWithDiscussion.length > 5) {
    return repliesWithDiscussion.slice(0, 5);
  }
  return repliesWithDiscussion;
};

export default async function LatestDiscussions() {
  const discussions = await getLatestDiscussions();
  const replies = getLatestReplies(discussions);
  return (
    <Card className="flex flex-col overflow-hidden">
      <Tabs defaultValue="Latest Discussions">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Latest Discussions">
            Latest Discussions
          </TabsTrigger>
          <TabsTrigger value="Latest Replies">Latest Replies</TabsTrigger>
        </TabsList>

        <TabsContent value="Latest Discussions">
          <CardContent className="h-[550px] space-y-6 pt-3 max-w-full overflow-x-hidden flex flex-col">
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
        </TabsContent>
        <TabsContent value="Latest Replies">
          <CardContent className="h-[550px] space-y-6 pt-3 max-w-full overflow-x-hidden flex flex-col">
            {replies?.map((reply) => (
              <div
                className="flex flex-row items-start justify-center gap-4"
                key={reply._id}
              >
                <Avatar className="sm:h-16 sm:w-16 h-10 w-10 shrink-0 border">
                  <Image
                    src={reply.user?.image || "/placeholder.svg"}
                    alt="Avatar"
                    width={64}
                    height={64}
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1 justify-center ">
                  <Link
                    href={`/discussions/${reply.discussionId}`}
                    className="text-sm font-medium hover:underline text-ellipsis overflow-hidden "
                    prefetch={false}
                  >
                    {reply.discussionTitle}
                  </Link>
                  <div>
                    <Link
                      href={`/discussions/category/${reply.discussionCategory}`}
                      className="text-xs text-gray-500"
                    >
                      {reply.discussionCategory}
                    </Link>
                  </div>
                  <div className="flex items-center ">
                    <Link
                      href={`/profile/${reply.user?._id}`}
                      className={`font-medium ${getRankColor(
                        reply.user?.role || ""
                      )} hover:underline text-xs sm:text-sm`}
                      prefetch={false}
                    >
                      {reply.user?.name}
                    </Link>
                    <span className=" ml-2 text-xs sm:text-sm text-center text-gray-400">
                      {calculateTime(new Date(reply.createdAt))}
                    </span>
                  </div>
                </div>
                <div>
                  <Badge>{reply.discussionAnswersLength} replies</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
