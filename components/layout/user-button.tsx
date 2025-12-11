"use client";

import { LogOut, Pencil, Shield, User, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FaRegBookmark } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";

const UserButton = () => {
  const session = useSession();

  const imgUrl = session?.data?.user.image || "";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <Avatar>
            <AvatarImage src={imgUrl} />
            <AvatarFallback className="border-2 border-slate-500">
              <UserRound />
            </AvatarFallback>
          </Avatar>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <User size={18} /> Profile
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <Pencil size={18} /> Create Post
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <FaRegBookmark size={18} /> Bookmark
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <Shield size={18} /> Admin
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="flex items-center gap-2" onClick={() => signOut()}>
            <LogOut size={18} /> Sign Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
