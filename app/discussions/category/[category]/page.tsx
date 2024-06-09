import { IDiscussion } from "@/@types/discussion";
import Discussions from "@/components/Discusssions";
import { getCurrentUrl } from "@/utils/getCurrentUrl";
import React from "react";

const getDiscussions = async (category: string) => {
  try {
    const res: Response = await fetch(
      getCurrentUrl() + `/externalApi/discussion/category/${category}`,
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
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default async function CategoryPage({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { category: string };
}) {
  if (!params.category) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Couldn't get any discussions</h1>
        </div>
      </div>
    );
  }
  let discussions = await getDiscussions(params.category);

  if (discussions) {
    //sort discussions by pinned
    discussions.sort((a, b) => {
      if (a.pinned && !b.pinned) {
        return -1;
      }
      if (!a.pinned && b.pinned) {
        return 1;
      }
      return 0;
    });
  }
  const page = searchParams["page"] ?? "1";
  const start = (Number(page) - 1) * 5;
  const end = start + 5;
  const slicedDiscussions = discussions?.slice(start, end);

  const hasNextPage = end < (discussions?.length ?? 0);
  const hasPreviousPage = start > 0;
  return (
    <Discussions
      discussions={slicedDiscussions}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      category={params.category}
    />
  );
}
