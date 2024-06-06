import { IDiscussion } from "@/@types/discussion";
import { auth } from "@/auth";
import { ReplyEditor } from "@/components/editor/ReplyEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCurrentUrl } from "@/utils/getCurrentUrl";
import DOMPurify from "isomorphic-dompurify";
import React from "react";

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
          <CardFooter>
            <div className="flex flex-row justify-center items-center text-sm text-gray-500">
              <img
                src={discussion.user.image}
                className="w-6 h-6 rounded-full mr-1"
              />
              {discussion.user.name}
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
            <CardFooter>
              <div className="flex flex-row justify-center items-center text-sm text-gray-500">
                <img
                  src={answer.user.image}
                  className="w-6 h-6 rounded-full mr-1"
                />
                {answer.user.name}
              </div>
            </CardFooter>
          </Card>
        ))}
        <ReplyEditor _id={discussion._id} session={session} />
      </div>
    </div>
  );
}
