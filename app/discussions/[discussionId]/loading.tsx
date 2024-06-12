import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function DiscussionLoading() {
  return (
    <div className="h-full w-full py-12">
      <div className="container px-4 md:px-6 space-y-4">
        <Card>
          <CardHeader>
            <Skeleton className="w-full h-12" />
          </CardHeader>
          <CardContent>
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <Skeleton className="h-5 w-full mt-2" key={i} />
              ))}
          </CardContent>
          <CardFooter>
            <div className="flex flex-row justify-center items-center text-sm text-gray-500">
              <Skeleton className="w-6 h-6 rounded-full mr-1" />
              <Skeleton className="w-28 h-4" />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
