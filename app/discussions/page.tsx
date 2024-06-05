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

export default async function page() {
  const discussions = await getDiscussions();
  return <Discussions discussions={discussions} />;
}
