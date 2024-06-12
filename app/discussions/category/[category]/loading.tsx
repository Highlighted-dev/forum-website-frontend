import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CategoryLoading() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 sm:flex sm:items-center sm:justify-between grid grid-rows-2 space-y-2">
        <div className="flex flex-row justify-center items-center space-x-4">
          <h1 className="text-2xl font-bold">Discussions</h1>
          <Link href="/discussions/create" className="flex justify-end">
            <Skeleton className="h-8 w-16" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-32" />
          <Input
            type="search"
            placeholder="Search discussions..."
            disabled
            className="max-w-xs"
          />
        </div>
      </div>
      <div className="grid gap-6">
        {Array(4)
          .fill(0)
          .map((i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-8 w-[300px]" />
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Badge>
                    <Skeleton className="h-4 w-16" />
                  </Badge>
                  <div>
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {Array(7)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton className="h-5 w-full mt-2" key={i} />
                  ))}
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="h-6 w-6">
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                  <div>
                    <Skeleton className="h-6 w-28" />
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
