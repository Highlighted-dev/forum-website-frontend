import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import { Suspense } from "react";
import ChatBox from "@/components/chatbox/ChatBox";
import LatestDiscussions from "@/components/LatestDiscussions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { db } from "@/db";
import { discussions } from "@/db/schema";
import MainPageLoading from "./mainPageLoading";

const getDiscussions = async () => {
  try {
    const allDiscussions = await db.select().from(discussions);

    if (!allDiscussions || allDiscussions.length === 0) {
      return [];
    }
    allDiscussions.forEach((discussion) => {
      discussion.content =
        discussion.content.length > 100
          ? discussion.content.substring(0, 100) + "<p>...</p>"
          : discussion.content;
    });
    return allDiscussions;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// Function to sanitize HTML content
const sanitizeHTML = (content: string) => {
  return DOMPurify.sanitize(content);
};

async function MainPage() {
  const discussions = await getDiscussions();
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <div className="container mx-auto grid grid-cols-1 gap-6 py-8 px-4 md:grid-cols-[1fr_420px] md:px-6">
          <ChatBox />
          <LatestDiscussions />
        </div>
        <div className="container mx-auto px-4 md:px-6 mb-6">
          <h1 className="text-2xl font-semibold leading-none tracking-tight mb-6">
            Featured discussions
          </h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {discussions
              ?.sort((a, b) => {
                return Number(b.featured) - Number(a.featured);
              })
              ?.map((discussion) => (
                <Card
                  key={discussion.id}
                  className="sm:grid grid-rows-5 flex flex-col"
                >
                  <div className="row-span-4 flex flex-col">
                    <CardHeader>
                      <div className="sm:text-5xl text-3xl font-bold text-ellipsis overflow-hidden ">
                        {discussion.title}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div
                        className="text-sm "
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHTML(discussion.content),
                        }}
                      />
                    </CardContent>
                  </div>
                  <CardFooter className="flex justify-end">
                    <Link
                      href={`/discussions/${discussion.id}`}
                      className="text-sm"
                      prefetch={false}
                    >
                      Read more
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </main>
      <footer className="text-white border-t">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
          <p className="text-sm">
            &copy; 2024 StrefaGier Forum by Highlighted-dev. All rights
            reserved.
          </p>
          <nav className="hidden space-x-4 md:flex">
            <Link
              href="/tos"
              className="text-sm transition-colors hover:text-gray-400"
              prefetch={false}
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-sm transition-colors hover:text-gray-400"
              prefetch={false}
            >
              Privacy Policy
            </Link>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-sm">Contact</TooltipTrigger>
                <TooltipContent>
                  <Label>Discord: highlighted_</Label>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </div>
      </footer>
    </div>
  );
}
export default async function Page() {
  return (
    <Suspense fallback={<MainPageLoading />}>
      <MainPage />
    </Suspense>
  );
}
