import React from "react";
import { AiOutlineLike, AiOutlineHeart } from "react-icons/ai";
import { LiaLaughSquintSolid, LiaMehSolid } from "react-icons/lia";
import { PiSmileySad } from "react-icons/pi";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";

const reactions = [
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

const TooltipReactions = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover to react</Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className=" flex gap-3">
            {reactions.map((reaction) => (
              <div key={reaction.id} className="flex flex-col items-center">
                <Button className=" text-2xl" variant={"outline"}>
                  {reaction.icon}
                </Button>
                <span className={`${reaction.color} mt-[2px]`}>
                  {reaction.name}
                </span>
              </div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipReactions;
