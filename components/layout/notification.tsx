import { Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

const Notification = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <div className="absolute bg-rose-500 h-6 w-6 rounded-full text-sm flex items-center justify-center bottom-2 left-2">
          <span>5</span>
        </div>
        <Bell />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full max-w-[400px]">
        <div className="flex gap-4 justify-between mb-2 p-2">
          <h3 className="font-bold text-lg">Notifications</h3>
          <button>Mark all as read</button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
