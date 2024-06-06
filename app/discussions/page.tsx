import { IDiscussion } from "@/@types/discussion";
import Discussions from "@/components/Discusssions";
import { getCurrentUrl } from "@/utils/getCurrentUrl";
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

export default async function DiscussionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const discussions = await getDiscussions();
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
    />
  );
}
