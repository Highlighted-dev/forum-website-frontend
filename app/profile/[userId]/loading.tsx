import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function ProfileLoading() {
  return (
    <div className="flex flex-col items-center justify-center md:m-auto my-auto mx-3">
      <Card className="flex flex-col p-3 sm:min-w-[400px] min-w-[280px]">
        <div className="flex flex-col items-center justify-center mb-8">
          <div>
            <Skeleton className="w-24 h-24 rounded-full mb-2" />
          </div>
          <h2 className="text-2xl font-bold">
            <Skeleton className="w-24 h-6" />
          </h2>
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-semibold">Bio</h3>
          <div>
            <Skeleton className="w-full h-4" />
          </div>
        </div>
        <div className="mb-4">
          <Skeleton className="w-full h-8" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <Card>
            <CardHeader>
              <CardTitle> Posts</CardTitle>
              <CardDescription>
                <Skeleton className="w-24 h-4" />
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Role</CardTitle>
              <CardDescription className="mx-2">
                <Skeleton className="w-24 h-4" />
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Recent Activity (Coming soon!)
          </h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-5 h-5 " />
              <p className="text-sm text-gray-300">Commented on a post</p>
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="w-5 h-5" />
              <p className="text-sm text-gray-300">Liked a post</p>
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="w-5 h-5" />
              <p className="text-sm text-gray-300">Uploaded a new post</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
