import { eq } from "drizzle-orm";
import Discussions from "@/components/Discusssions";
import { db } from "@/db";
import { discussions } from "@/db/schema";

const getDiscussions = async (category: string) => {
  try {
    const allDiscussions = await db.query.discussions.findMany({
      where: eq(discussions.category, category),
      with: {
        user: {
          with: {
            answers: true,
            discussions: true,
          },
        },
      },
    });

    // Now substring the content to only show the first 100 characters. Also if the content is too long, add "..." at the end.
    allDiscussions.forEach((discussion) => {
      discussion.content =
        discussion.content.length > 300
          ? discussion.content.substring(0, 600) + "..."
          : discussion.content;
      console.log(discussion.content);
    });
    return allDiscussions;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default async function CategoryPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ page?: string }>;
  params: Promise<{ category: string }>;
}) {
  const _params = await params;
  const _searchParams = await searchParams;
  if (!_params.category) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Couldn't get any discussions</h1>
        </div>
      </div>
    );
  }
  let discussions = await getDiscussions(_params.category);

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
  const page = _searchParams.page ?? "1";
  const start = (Number(page) - 1) * 5;
  const end = start + 5;
  const slicedDiscussions = discussions?.slice(start, end);

  const hasNextPage = end < (discussions?.length ?? 0);
  const hasPreviousPage = start > 0;

  const totalPages = Math.ceil((discussions?.length ?? 0) / 5);
  return (
    <Discussions
      discussions={slicedDiscussions}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      category={_params.category}
      totalPages={totalPages}
    />
  );
}
