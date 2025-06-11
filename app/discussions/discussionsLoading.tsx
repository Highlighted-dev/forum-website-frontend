import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

export default function DiscussionsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-6 md:flex md:items-center md:justify-between grid grid-rows-2 space-y-2">
        <div className="flex flex-row justify-center items-center space-x-4">
          <h1 className="text-2xl font-bold">Discussions</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Card key={i + 10} className="grid grid-cols-5 min-h-[100px]">
            <CardHeader className="flex flex-col items-start justify-center lg:col-span-3 col-span-2">
              <Skeleton className="h-8 w-32" />
            </CardHeader>
            <CardContent className="p-0 flex items-center justify-start lg:col-span-2 col-span-3">
              <div className="p-4 flex flex-col justify-center items-center mr-2">
                <Skeleton className="h-6 w-4" />
                <Label className=" text-sm text-gray-500">Posts</Label>
              </div>
              <div className="flex justify-center items-center w-full">
                <div className="mr-2">
                  <div className="h-10 w-10 shrink-0">
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </div>
                </div>
                <div className="flex flex-col w-full mr-1">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-[90%] mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
