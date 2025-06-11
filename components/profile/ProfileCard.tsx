"use client";
import { InferSelectModel } from "drizzle-orm";
import { HeartIcon, TextIcon, UploadIcon } from "lucide-react";
import { Session } from "next-auth";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { answers, discussions, users } from "@/db/schema";
import { getRankColor } from "@/utils/rankColors";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import EditProfileForm from "./EditProfileForm";

export default function ProfileCard({
  session,
  user,
}: {
  session: Session;
  user?:
    | (InferSelectModel<typeof users> & {
        answers: InferSelectModel<typeof answers>[];
        discussions: InferSelectModel<typeof discussions>[];
      })
    | null;
}) {
  const [editing, setEditing] = useState(false);
  return (
    <Card className="flex flex-col p-3 sm:min-w-[400px] min-w-[300px]">
      {!editing ? (
        <>
          <div className="flex flex-col items-center justify-center mb-4">
            <Avatar className="w-24 h-24 mb-2">
              <img src={user?.image ?? ""} />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{user?.name ?? "Username"}</h2>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold ">Bio</h3>
            <p className="text-sm text-gray-300">{user?.bio ?? "No bio set"}</p>
          </div>
          {user?.id === session?.user?.id && (
            <Button className="mb-4" onClick={() => setEditing(!editing)}>
              Edit Profile
            </Button>
          )}
        </>
      ) : (
        <EditProfileForm
          session={session}
          setEditing={setEditing}
          editing={editing}
        />
      )}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <Card>
          <CardHeader>
            <CardTitle>
              {" "}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>Posts</TooltipTrigger>
                  <TooltipContent>
                    <Label>
                      Number of created discussions + number of replies
                    </Label>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>
              {user?.discussions.length ||
                0 + 0 ||
                user?.answers.length ||
                0}{" "}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Role</CardTitle>
            <CardDescription
              className={`font-bold ${getRankColor(user?.role || "")}`}
            >
              {user?.role}
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
            <TextIcon className="w-5 h-5 text-gray-300" />
            <p className="text-sm text-gray-300">Commented on a post</p>
          </div>
          <div className="flex items-center space-x-2">
            <HeartIcon className="w-5 h-5 text-gray-300" />
            <p className="text-sm text-gray-300">Liked a post</p>
          </div>
          <div className="flex items-center space-x-2">
            <UploadIcon className="w-5 h-5 :text-gray-300" />
            <p className="text-sm text-gray-300">Uploaded a new post</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
