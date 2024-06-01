import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

export default function LatestDiscussions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-6 border-b">
        <CardTitle>Latest Discussions</CardTitle>
        <Button variant="ghost">
          <Link href="#" prefetch={false}>
            View all
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="h-[400px] overflow-y-auto space-y-4 pt-3">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 shrink-0 border">
            <img src="/placeholder.svg" alt="Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <Link
                  href="#"
                  className="font-medium text-blue-500 hover:underline"
                  prefetch={false}
                >
                  John Doe
                </Link>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  2 hours ago
                </span>
              </div>
            </div>
            <Link
              href="#"
              className="mt-2 block text-lg font-medium hover:underline"
              prefetch={false}
            >
              How to set up a React project with Tailwind CSS?
            </Link>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 shrink-0 border">
            <img src="/placeholder.svg" alt="Avatar" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <Link
                  href="#"
                  className="font-medium text-blue-500 hover:underline"
                  prefetch={false}
                >
                  Sarah Anderson
                </Link>
                <span className="ml-2 text-sm text-gray-400">1 day ago</span>
              </div>
            </div>
            <Link
              href="#"
              className="mt-2 block text-lg font-medium hover:underline"
              prefetch={false}
            >
              Best practices for writing clean and maintainable CSS
            </Link>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 shrink-0 border">
            <img src="/placeholder.svg" alt="Avatar" />
            <AvatarFallback>MJ</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <Link
                  href="#"
                  className="font-medium text-blue-500 hover:underline"
                  prefetch={false}
                >
                  Michael Johnson
                </Link>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  3 days ago
                </span>
              </div>
            </div>
            <Link
              href="#"
              className="mt-2 block text-lg font-medium hover:underline"
              prefetch={false}
            >
              Migrating from JavaScript to TypeScript: Tips and Tricks
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
