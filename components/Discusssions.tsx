"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ListOrderedIcon } from "lucide-react";
import { IDiscussion } from "@/@types/discussion";
import { Badge } from "./ui/badge";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useSearchParams } from "next/navigation";

export default function Discussions({
  discussions,
  hasNextPage,
  hasPreviousPage,
  category,
}: {
  discussions: IDiscussion[] | undefined;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  category?: string;
}) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1", 10);

  if (!discussions)
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Couldn't get any discussions</h1>
        </div>
      </div>
    );

  const filteredDiscussions = discussions.filter((discussion) =>
    discussion.title.toLowerCase().includes(search.toLowerCase())
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

  const sanitizedHTML = (discussion: IDiscussion) => {
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
                Sort by: {sortBy === "date" ? "Date" : "Category"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="category" disabled>
                  Category
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            type="search"
            placeholder="Search discussions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </div>
      <div className="grid gap-6">
        {sortedDiscussions.map((discussion) => (
          <Card key={discussion._id}>
            <CardHeader>
              <Link href={`/discussions/${discussion._id}`}>
                <CardTitle>{discussion.title}</CardTitle>
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
                className="text-gray-700 dark:text-gray-400"
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
                <div>{discussion.user.name}</div>
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
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={url(pageNumber)}
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
