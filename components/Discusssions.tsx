"use client";

import { InferSelectModel } from "drizzle-orm";
import DOMPurify from "isomorphic-dompurify";
import { ListOrderedIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { discussions as dbDiscussions, users } from "@/db/schema";
import { getRankColor } from "@/utils/rankColors";
import { Badge } from "./ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function Discussions({
  discussions,
  hasNextPage,
  hasPreviousPage,
  totalPages,
  category,
}: {
  discussions:
    | Array<
        InferSelectModel<typeof dbDiscussions> & {
          user: InferSelectModel<typeof users>;
        }
      >
    | undefined;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
  category?: string;
}) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  console.log(discussions);

  if (!discussions)
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Couldn't get any discussions</h1>
        </div>
      </div>
    );

  const filteredDiscussions = discussions.filter((discussion) =>
    discussion.title.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedDiscussions = filteredDiscussions.sort((a, b) => {
    if (a.pinned === b.pinned) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return a.pinned ? -1 : 1;
  });

  const url = (page: number) => {
    return `/discussions/category/${category}?page=${page}`;
  };

  const sanitizedHTML = (
    discussion: InferSelectModel<typeof dbDiscussions>,
  ) => {
    if (!discussion) return;
    return {
      __html: DOMPurify.sanitize(discussion.content),
    };
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 sm:flex sm:items-center sm:justify-between grid grid-rows-2 space-y-2">
        <div className="flex flex-row justify-center items-center space-x-4">
          <h1 className="text-2xl font-bold">Discussions</h1>
          <Link href="/discussions/create" className="flex justify-end">
            <Button variant={"outline"} className="p-3">
              New
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ListOrderedIcon className="h-4 w-4" />
                Sort by: {sortBy === "date" ? "Date" : "Username"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="username" disabled>
                  Username
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Input
                  type="search"
                  placeholder="Search discussions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="max-w-xs"
                  disabled
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Coming soon</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="grid gap-6">
        {sortedDiscussions.map((discussion) => (
          <Card key={discussion.id} className="flex flex-col overflow-hidden">
            <CardHeader>
              <Link href={`/discussions/${discussion.id}`}>
                <div className="sm:text-5xl text-3xl font-bold text-ellipsis overflow-hidden ">
                  {discussion.title}
                </div>
              </Link>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Badge>{discussion.category}</Badge>
                {discussion.pinned && (
                  <Badge className="bg-green-700 hover:bg-green-900">
                    Pinned
                  </Badge>
                )}
                <div>
                  {new Date(discussion.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div
                className="text-gray-400 text-ellipsis overflow-hidden "
                dangerouslySetInnerHTML={sanitizedHTML(discussion)}
              />
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={discussion.user.image || "/placeholder.svg"}
                    alt={discussion.user.name}
                  />
                  <AvatarFallback>
                    {discussion.user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Link
                  className={`text-sm ${getRankColor(
                    discussion?.user.role || "",
                  )}`}
                  href={`/profile/${discussion.user.id}`}
                >
                  {discussion.user.name}
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={hasPreviousPage ? url(page - 1) : url(page)}
            />
          </PaginationItem>
          {[...Array(3)].map((_, i) => {
            const pageNumber = page === 1 ? i + 1 : page - 1 + i;
            const isDisabled = pageNumber < 1 || pageNumber > totalPages;

            return (
              <PaginationItem key={`pagination-${pageNumber}-${i}`}>
                <PaginationLink
                  href={isDisabled ? "#" : url(pageNumber)}
                  isActive={pageNumber === page}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext href={hasNextPage ? url(page + 1) : url(page)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
