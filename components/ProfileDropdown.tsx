import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SignOut } from "./SignOut";
import Link from "next/link";
import { Button } from "./ui/button";
import { FaRegUser } from "react-icons/fa";
import { LuArrowBigRight } from "react-icons/lu";

export default function ProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <FaRegUser className="mr-2 h-4 w-4" />
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <LuArrowBigRight className="mr-2 h-4 w-4" />
            <span>Something</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <LuArrowBigRight className="mr-2 h-4 w-4" />
            <span>Something 2</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
