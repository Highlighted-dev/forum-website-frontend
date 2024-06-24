"use client";
import React from "react";
import { AiOutlineLike, AiOutlineHeart } from "react-icons/ai";
import { LiaLaughSquintSolid, LiaMehSolid } from "react-icons/lia";
import { PiSmileySad } from "react-icons/pi";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { changeReaction } from "./ChangeReactionAction";
import { Session } from "next-auth";

export const reactions = [
  { id: 1, name: "Like", icon: <AiOutlineLike />, color: "text-blue-500" },
  {
    id: 2,
    name: "Funny",
    icon: <LiaLaughSquintSolid />,
    color: "text-yellow-400",
  },
  { id: 3, name: "Love", icon: <AiOutlineHeart />, color: "text-red-500" },
  { id: 4, name: "Sad", icon: <PiSmileySad />, color: "text-gray-400" },
  { id: 5, name: "Cringe", icon: <LiaMehSolid />, color: "text-purple-400" },
];

export default function TooltipReactions({
  id,
  session,
  answerId,
}: {
  id: string;
  session: Session | null;
  answerId?: string;
}) {
  const { handleSubmit } = useForm();
  const [reaction, setReaction] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const onSubmit = async () => {
    console.log(reaction);
    setLoading(true);
    let result;
    try {
      result = await changeReaction(reaction, id, session, answerId);
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setLoading(false);
      toast({
        title: result?.status,
        description: result?.message,
      });
      router.refresh();
    }
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover to react</Button>
        </TooltipTrigger>
        <TooltipContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" flex gap-3">
              {reactions.map((reaction) => (
                <div key={reaction.id} className="flex flex-col items-center">
                  <Button
                    className="text-2xl"
                    variant={"outline"}
                    type="submit"
                    id={reaction.name.toLowerCase()}
                    onClick={() => setReaction(reaction.name)}
                  >
                    {reaction.icon}
                  </Button>
                  <span className={`${reaction.color} mt-[2px]`}>
                    {reaction.name}
                  </span>
                </div>
              ))}
            </div>
          </form>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
