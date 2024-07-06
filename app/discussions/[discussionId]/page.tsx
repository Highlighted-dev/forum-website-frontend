import { IDiscussion } from "@/@types/discussion";
import { auth } from "@/auth";
import { ReplyEditor } from "@/components/editor/ReplyEditor";
import LockDiscussionForm from "@/components/LockDiscussionForm";
import TooltipReactions from "@/components/reactions/TooltipReactions";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getCurrentUrl } from "@/utils/getCurrentUrl";
import { getRankColor } from "@/utils/rankColors";
import DOMPurify from "isomorphic-dompurify";
import { Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineLike, AiOutlineHeart } from "react-icons/ai";
import { LiaLaughSquintSolid, LiaMehSolid } from "react-icons/lia";
import { PiSmileySad } from "react-icons/pi";

const getDiscussion = async (id: string): Promise<IDiscussion | null> => {
  try {
    const res: Response = await fetch(
      getCurrentUrl() + `/externalApi/discussion/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_KEY_TOKEN!,
        },
        cache: "no-store",
      }
    );

    const data = (await res.json()) as IDiscussion;
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getUser = async (userId: string) => {
  try {
    const response = await fetch(
      getCurrentUrl() + `/externalApi/user/${userId}`,
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.API_KEY_TOKEN!,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

interface ReactionCount {
  icon: JSX.Element;
  reaction: string;
  count: number;
}

interface IReaction {
  reaction: string;
}

const aggregateReactions = (reactionList: IReaction[]): ReactionCount[] => {
  const reactions = [
    { icon: <AiOutlineLike />, reaction: "like" },
    { icon: <AiOutlineHeart />, reaction: "love" },
    { icon: <LiaLaughSquintSolid />, reaction: "funny" },
    { icon: <LiaMehSolid />, reaction: "cringe" },
    { icon: <PiSmileySad />, reaction: "sad" },
  ];

  return reactions
    .map((r) => {
      const count = reactionList.filter(
        (re) => re.reaction.toLowerCase() === r.reaction
      ).length;
      return count > 0 ? { ...r, count } : null;
    })
    .filter(Boolean) as ReactionCount[];
};

const formatDateTime = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default async function DiscussionIdPage({
  params,
}: {
  params: { discussionId: string };
}) {
  const session = await auth();
  const discussion = await getDiscussion(params.discussionId);
  // get all user ids from discussion and answers
  const userIds = [
    discussion?.user._id,
    ...(discussion?.answers || []).map((answer) => answer.user._id),
  ];
  // get the user data for each user id
  const users = await Promise.all(userIds.map((id) => getUser(id || "")));

  if (!discussion)
    return (
      <div className="h-full w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="flex">
            <h1 className="text-5xl font-bold">Discussion not found</h1>
          </div>
          <Separator className="my-4" />
        </div>
      </div>
    );

  const sanitizedHTML = (content: string) => {
    return { __html: DOMPurify.sanitize(content) };
  };

  return (
    <div className="h-full w-full py-12">
      <div className="container px-4 md:px-6 space-y-4">
        <LockDiscussionForm discussion={discussion} session={session} />
        <Card className="md:grid md:grid-cols-7 lg:grid-cols-6 flex flex-col">
          <div className="flex flex-col justify-start items-center lg:col-span-1 col-span-2 md:border-r border-b md:pb-0 ">
            <div className="flex flex-col justify-center items-center text-sm mt-8">
              <Image
                src={discussion.user.image || "/placeholder.svg"}
                className=" rounded-md"
                alt="Avatar"
                width={100}
                height={100}
              />
              <Link
                className={`text-lg font-bold mt-1 ${getRankColor(
                  discussion?.user.role || ""
                )}`}
                href={`/profile/${discussion.user._id}`}
              >
                {discussion.user.name}
              </Link>
              <Badge
                className={`mt-1 p-2 rounded-lg ${getRankColor(
                  discussion.user.role
                )} bg-secondary hover:bg-stone-900`}
              >
                {discussion.user.role ? discussion.user.role : "User"}
              </Badge>
              <Label className="mt-2 text-xs text-gray-500">
                {users.find((u) => u._id === discussion.user._id)
                  ?.numberOfDiscussions +
                  users.find((u) => u._id === discussion.user._id)
                    ?.numberOfReplies || 0}{" "}
                posts
              </Label>
              <Label className="text-sm text-gray-400 pb-4">
                Joined (Coming soon){" "}
                {/* {formatDateTime(
                  users.find((u) => u._id === discussion.user._id)?.createdAt
                )} */}
              </Label>
            </div>
          </div>
          <div className="col-span-5">
            <CardHeader>
              <CardTitle className="sm:text-5xl text-3xl font-bold text-ellipsis overflow-hidden">
                {discussion.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="text-ellipsis overflow-hidden"
                dangerouslySetInnerHTML={sanitizedHTML(discussion.content)}
                id={"editor"}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex flex-row gap-2">
                <TooltipReactions id={params.discussionId} session={session} />
                {aggregateReactions(discussion.reactions).map((reaction) => (
                  <div
                    className="flex flex-row items-center"
                    key={reaction.reaction}
                  >
                    {reaction.icon}
                    <Label className="text-sm text-gray-500 ml-1">
                      {reaction.count}
                    </Label>
                  </div>
                ))}
              </div>
            </CardFooter>
          </div>
        </Card>
        {discussion.answers?.map((answer) => (
          <Card
            className="md:grid md:grid-cols-7 lg:grid-cols-6 flex flex-col"
            key={answer._id}
          >
            <div className="flex flex-col justify-start items-center lg:col-span-1 col-span-2 md:border-r border-b md:pb-0 ">
              <div className="flex flex-col justify-center items-center text-sm mt-8">
                <Image
                  src={answer.user.image || "/placeholder.svg"}
                  className=" rounded-md"
                  alt="Avatar"
                  width={100}
                  height={100}
                />
                <Link
                  className={`text-lg font-bold mt-1 ${getRankColor(
                    answer?.user.role || ""
                  )}`}
                  href={`/profile/${answer.user._id}`}
                >
                  {answer.user.name}
                </Link>
                <Badge
                  className={`mt-1 p-2 rounded-lg ${getRankColor(
                    answer.user.role
                  )} bg-secondary hover:bg-stone-900`}
                >
                  {answer.user.role ? answer.user.role : "User"}
                </Badge>
                <Label className="mt-2 text-xs text-gray-500">
                  {users.find((u) => u._id === answer.user._id)
                    ?.numberOfDiscussions +
                    users.find((u) => u._id === answer.user._id)
                      ?.numberOfReplies || 0}{" "}
                  posts
                </Label>
                <Label className="text-sm text-gray-400 pb-4">
                  Joined (Coming soon){" "}
                  {/* {formatDateTime(
                    users.find((u) => u._id === answer.user._id)?.createdAt
                  )} */}
                </Label>
              </div>
            </div>
            <div className="col-span-5">
              <CardContent className="mt-4">
                <div
                  dangerouslySetInnerHTML={sanitizedHTML(answer.content)}
                  id={"editor"}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex flex-row gap-2">
                  <TooltipReactions
                    id={params.discussionId}
                    session={session}
                    answerId={answer._id}
                  />
                  {aggregateReactions(answer.reactions).map((reaction) => (
                    <div
                      className="flex flex-row items-center"
                      key={reaction.reaction}
                    >
                      {reaction.icon}
                      <Label className="text-sm text-gray-500 ml-1">
                        {reaction.count}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardFooter>
            </div>
          </Card>
        ))}
        {discussion.closed ? (
          <div className="flex justify-center items-center">
            <Lock className="h-6 w-6 mr-2 text-primary" />
            <Label className="text-center text-primary">
              This discussion is closed
            </Label>
          </div>
        ) : (
          <ReplyEditor _id={discussion._id} session={session} />
        )}
      </div>
    </div>
  );
}
