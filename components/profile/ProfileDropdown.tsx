import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SignOut } from "../SignOut";
import Link from "next/link";
import { Button } from "../ui/button";
import { FaRegUser } from "react-icons/fa";
import { LuArrowBigRight } from "react-icons/lu";
import { Session } from "next-auth";

export default function ProfileDropdown({
  session,
}: {
  session: Session | null;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <Link
            href={
              session?.user.id ? `/profile/${session?.user.id}` : `/profile`
            }
          >
            <DropdownMenuItem>
              <FaRegUser className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem disabled>
            <LuArrowBigRight className="mr-2 h-4 w-4" />
            <span>Stats (coming soon)</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <LuArrowBigRight className="mr-2 h-4 w-4" />
            <span>??? (coming soon)</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
