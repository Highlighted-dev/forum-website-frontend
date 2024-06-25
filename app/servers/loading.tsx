import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function loading() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col justify-center items-center">
        <Card className="min-h-[400px]">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center">
              Servers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-5 w-full mt-2" />
            <Skeleton className="h-5 w-full mt-2" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
