import { IDiscussion } from "@/@types/discussion";
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

  const sanitizedHTML = () => {
    return { __html: DOMPurify.sanitize(discussion.content) };
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
            <div dangerouslySetInnerHTML={sanitizedHTML()} id={"editor"} />
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">By: {discussion.username}</p>
          </CardFooter>
        </Card>
        <div className="flex justify-end align-center">
          <Button>Reply</Button>
        </div>
      </div>
    </div>
  );
}
