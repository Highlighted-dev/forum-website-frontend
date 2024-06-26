import Link from "next/link";
import ChatBox from "@/components/chatbox/ChatBox";
import LatestDiscussions from "@/components/LatestDiscussions";
import { getCurrentUrl } from "@/utils/getCurrentUrl";
import { IDiscussion } from "@/@types/discussion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DOMPurify from "isomorphic-dompurify";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Suspense } from "react";
import MainPageLoading from "./mainPageLoading";

// Function to get discussions from API
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
    if (data.length > 0) {
      // Get only data that has featured = true, only up to 6 discussions.
      const discussions = data
        .filter((discussion) => discussion.featured)
        .slice(0, 6);
      // Now substring the content to only show the first 100 characters. Also if the content is too long, add "..." at the end.
      discussions.forEach((discussion) => {
        discussion.content =
          discussion.content.length > 100
            ? discussion.content.substring(0, 100) + "<p>...</p>"
            : discussion.content;
      });
      return discussions;
    }

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// Function to sanitize HTML content
const sanitizeHTML = (content: string) => {
  return DOMPurify.sanitize(content);
};

export default async function Page() {
  const discussions = await getDiscussions();

  return (
    <Suspense fallback={<MainPageLoading />}>
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex-1">
          <div className="container mx-auto grid grid-cols-1 gap-6 py-8 px-4 md:grid-cols-[1fr_460px] md:px-6">
            <ChatBox />
            <LatestDiscussions />
          </div>
          <div className="container mx-auto px-4 md:px-6 mb-6">
            <h1 className="text-2xl font-semibold leading-none tracking-tight mb-6">
              Featured discussions
            </h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {discussions?.map((discussion) => (
                <Card key={discussion._id} className="grid grid-rows-5">
                  <div className="row-span-4">
                    <CardHeader>
                      <div className="text-5xl font-bold text-ellipsis overflow-hidden lg:max-w-[550px] max-w-[300px] ">
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
                      href={`/discussions/${discussion._id}`}
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
    </Suspense>
  );
}
