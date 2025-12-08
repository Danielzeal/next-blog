"use client";

import { MdNoteAlt } from "react-icons/md";

import Container from "./container";
import ThemeToggle from "./theme-toggle";
import SearchInput from "./search-input";
import Notification from "./notification";
import UserButton from "./user-button";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const session = useSession();
  const isLoggedIn = session.status === "authenticated";
  const path = usePathname();

  useEffect(() => {
    if (!isLoggedIn) {
      const updateSession = async () => {
        await session.update();
      };

      updateSession();
    }
  }, [isLoggedIn, path]);
  console.log("NavBar Session:", session);
  return (
    <nav className="sticky top-0 border-b z-30">
      <Container>
        <div className="flex justify-between items-center gap-8">
          <div className="flex items-center gap-1 cursor-pointer">
            <MdNoteAlt size={24} />
            <div className="font-bold text-xl">Blog</div>
          </div>
          <SearchInput />
          <div className="flex gap-5 sm:gap-8 items-center">
            <ThemeToggle />
            {isLoggedIn && <Notification />}
            {isLoggedIn && <UserButton />}
            {!isLoggedIn && (
              <>
                <Link href={"/login"}>Login</Link>
                <Link href={"/register"}>Register</Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
