import { IDiscussion } from "@/@types/discussion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getCurrentUrl } from "@/utils/getCurrentUrl";
import Link from "next/link";
import React from "react";

const getDiscussions = async () => {
  try {
    const res: Response = await fetch(
      getCurrentUrl() + `/externalApi/discussion`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_KEY_TOKEN!,
        },
        cache: "no-store",
      }
    );
    const data = (await res.json()) as IDiscussion[];
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default async function DiscussionsPage() {
  const discussions = await getDiscussions();

  // Sort discussions by creationDate in descending order
  const sortedDiscussions = discussions?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Get unique categories from sorted discussions
  const categories = sortedDiscussions?.map(
    (discussion) => discussion.category
  );
  const uniqueCategories = [...new Set(categories)];

  // Get the latest discussion for each category
  const latestDiscussions = uniqueCategories.map((category) => {
    return sortedDiscussions?.find(
      (discussion) => discussion.category === category
    );
  });

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-6 md:flex md:items-center md:justify-between grid grid-rows-2 space-y-2">
        <div className="flex flex-row justify-center items-center space-x-4">
          <h1 className="text-2xl font-bold">Discussions</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {latestDiscussions?.map((discussion) => (
          <Card
            key={discussion?._id}
            className="grid grid-cols-5 min-h-[100px]"
          >
            <CardHeader className="flex flex-col items-start justify-center lg:col-span-3 col-span-2">
              <Link href={`/discussions/category/${discussion?.category}`}>
                <CardTitle className="text-2xl font-bold">
                  {discussion?.category}
                </CardTitle>
              </Link>
            </CardHeader>
            <CardContent className="p-0 flex items-center justify-start lg:col-span-2 col-span-3">
              <div className="p-4 flex flex-col justify-center items-center mr-2">
                <Label className="text-xl">
                  {
                    discussions?.filter(
                      (d) => d.category === discussion?.category
                    ).length
                  }
                </Label>
                <Label className=" text-sm text-gray-500">Posts</Label>
              </div>
              <div className="flex justify-center items-center">
                <div className="mr-2">
                  <Avatar className="h-10 w-10 shrink-0 border">
                    <img
                      src={discussion?.user.image || "/placeholder.svg"}
                      alt="Avatar"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col">
                  <Link href={`/discussions/${discussion?._id}`}>
                    <p>
                      {discussion?.title.length! > 45
                        ? discussion?.title.slice(0, 45) + "..."
                        : discussion?.title}
                    </p>
                  </Link>
                  <p className="text-sm text-gray-500">
                    {discussion?.user.name}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
