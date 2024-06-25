import { IDiscussion } from "@/@types/discussion";
import { auth } from "@/auth";
import { ReplyEditor } from "@/components/editor/ReplyEditor";
import TooltipReactions from "@/components/reactions/TooltipReactions";
import { Button } from "@/components/ui/button";
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
const getDiscussion = async (id: string) => {
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

export default async function DiscussionIdPage({
  params,
}: {
  params: { discussionId: string };
}) {
  const session = await auth();
  const discussion = await getDiscussion(params.discussionId);
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

  const reactions = [
    { icon: <AiOutlineLike />, reaction: "like" },
    { icon: <AiOutlineHeart />, reaction: "love" },
    { icon: <LiaLaughSquintSolid />, reaction: "funny" },
    { icon: <LiaMehSolid />, reaction: "cringe" },
    { icon: <PiSmileySad />, reaction: "sad" },
  ];
  return (
    <div className="h-full w-full py-12">
      <div className="container px-4 md:px-6 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-5xl font-bold">
              {discussion.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              dangerouslySetInnerHTML={sanitizedHTML(discussion.content)}
              id={"editor"}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex flex-row gap-2">
              <TooltipReactions id={params.discussionId} session={session} />
              {discussion.reactions?.map((reaction) => (
                <div key={reaction._id} className="flex flex-row">
                  {reactions.map((r) => {
                    if (r.reaction === reaction.reaction.toLowerCase()) {
                      return (
                        <div
                          className="flex flex-row items-center"
                          key={r.reaction}
                        >
                          {r.icon}
                          <Label className="text-sm text-gray-500 ml-1">
                            {
                              discussion.reactions?.filter(
                                (re) => re.reaction.toLowerCase() === r.reaction
                              ).length
                            }
                          </Label>
                        </div>
                      );
                    }
                  })}
                </div>
              ))}
            </div>
            <div className="flex flex-row justify-center items-center text-sm text-gray-500">
              <Image
                src={discussion.user.image || "/placeholder.svg"}
                className="rounded-full mr-1"
                alt="Avatar"
                width={30}
                height={30}
              />
              <Link
                className={`text-sm ${getRankColor(
                  discussion?.user.role || ""
                )}`}
                href={`/profile/${discussion.user._id}`}
              >
                {discussion.user.name}
              </Link>
            </div>
          </CardFooter>
        </Card>
        {discussion.answers?.map((answer) => (
          <Card key={answer._id}>
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
                {answer.reactions?.map((reaction) => (
                  <div key={reaction._id} className="flex flex-row">
                    {reactions.map((r) => {
                      if (r.reaction === reaction.reaction.toLowerCase()) {
                        return (
                          <div
                            className="flex flex-row items-center"
                            key={r.reaction}
                          >
                            {r.icon}
                            <Label className="text-sm text-gray-500 ml-1">
                              {
                                answer.reactions?.filter(
                                  (re) =>
                                    re.reaction.toLowerCase() === r.reaction
                                ).length
                              }
                            </Label>
                          </div>
                        );
                      }
                    })}
                  </div>
                ))}
              </div>
              <div className="flex flex-row justify-center items-center text-sm text-gray-500">
                <Image
                  src={answer.user.image || "/placeholder.svg"}
                  className="rounded-full mr-1"
                  alt="Avatar"
                  width={30}
                  height={30}
                />
                <Link
                  className={`text-sm ${getRankColor(
                    discussion?.user.role || ""
                  )}`}
                  href={`/profile/${answer.user._id}`}
                >
                  {answer.user.name}
                </Link>
              </div>
            </CardFooter>
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
