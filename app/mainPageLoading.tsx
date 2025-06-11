import { SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MainPageLoading() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <div className="container mx-auto grid grid-cols-1 gap-6 py-8 px-4 md:grid-cols-[1fr_460px] md:px-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-6 border-b">
              <CardTitle>Chat</CardTitle>
              <Button variant="ghost" size="icon" disabled>
                <SettingsIcon className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="h-[300px] overflow-y-auto pt-3">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div className="flex items-start gap-4" key={i}>
                    <div>
                      <Skeleton className="h-10 w-10 rounded-3xl" />
                      <Skeleton className="flex-1" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-row">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="ml-2 h-4 w-20" />
                        </div>
                      </div>
                      <Skeleton className="h-4 w-40 mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col w-full border-t p-6">
              <Skeleton className="h-6 w-32 mb-1" />
              <div className="flex flex-col w-full">
                <Skeleton className="h-20 w-full rounded-md border" />
                <div className="flex justify-end mt-1">
                  <Skeleton className="h-11 w-16" />
                </div>
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-6 border-b">
              <CardTitle>Latest Discussions</CardTitle>
              <Skeleton className="h-6 w-20" />
            </CardHeader>
            <CardContent className="h-[440px] overflow-y-hidden space-y-4 pt-3 max-w-full overflow-x-hidden">
              {[1, 2, 3, 4, 5].map((i) => (
                <div className="flex items-start justify-center gap-4" key={i}>
                  <div>
                    <Skeleton className="h-16 w-16 shrink-0 border rounded-full" />
                  </div>
                  <div className="flex flex-col flex-1 justify-center ">
                    <div className="flex items-center">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="ml-2 h-4 w-20" />
                    </div>
                    <div className="mt-2">
                      <Skeleton className="h-4 w-10" />
                    </div>
                    <Skeleton className="h-6 w-60 mt-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="container mx-auto px-4 md:px-6 mb-6">
          <h1 className="text-2xl font-semibold leading-none tracking-tight mb-6">
            Featured discussions
          </h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 mt-1 w-full " />
                  </CardTitle>
                </CardHeader>
                <CardContent className="mt-5">
                  <div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Skeleton className="h-6 w-20" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
