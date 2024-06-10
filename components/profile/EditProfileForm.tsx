"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { Session } from "next-auth";
import { Button } from "../ui/button";
import { editProfileAction } from "./EditProfileAction";

export interface IEditProfileFormValues {
  name: string;
  bio: string;
}

export default function EditProfileForm({
  session,
  setEditing,
  editing,
}: {
  session: Session | null;
  setEditing: (editing: boolean) => void;
  editing: boolean;
}) {
  const { register, handleSubmit, reset } = useForm<IEditProfileFormValues>();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const onSubmit = async (formData: IEditProfileFormValues) => {
    setLoading(true);
    let result;
    try {
      result = await editProfileAction(formData, session);
      reset();
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setLoading(false);
      toast({
        title: result?.status,
        description: result?.message,
      });
      setEditing(!editing);
      router.refresh();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center mb-4">
        <Avatar className="w-24 h-24 mb-2">
          <img src={session?.user?.image ?? ""} />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <Input placeholder="Change your name" {...register("name")} />
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold ">Bio</h3>
        <Input placeholder="Change your bio" {...register("bio")} />
      </div>
      <Button className="mb-4 w-full" type="submit">
        Save Changes
      </Button>
    </form>
  );
}
