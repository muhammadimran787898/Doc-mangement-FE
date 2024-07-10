"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Notification } from "../../../assets/svg/index";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { deleteCookie } from "@/utils/cokies";

export default function Header() {
  const router = useRouter();

  const user = useSelector((state: any) => state.userReducer.user);

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    deleteCookie("authToken");
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <div className="w-full px-3">
      <div className="my-4 rounded-xl bg-blue-300 dark:bg-slate-500 sm:py-4">
        <header className="sticky top-0 flex h-14 items-center justify-end gap-4 bg-background px-4 sm:static sm:h-auto sm:bg-transparent sm:px-6">
          <div className="relative ml-auto flex-1 md:grow-0">
            {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> */}
            {/* <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            /> */}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="/doc.avif" alt="@shadcn" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-black">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuGroup>
                <Link href="/profile">
                  <DropdownMenuItem className="text-muted-foreground">
                    Profile
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>

              <DropdownMenuGroup>
                <Link href="/login">
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-red-500 focus:bg-red-200 focus:text-red-500 active:text-red-500"
                  >
                    Sign out
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="bg-transparent">
            <button
              type="button"
              onClick={toggleTheme}
              className="hs-dark-mode hs-dark-mode-active:hidden inline-flex items-center gap-x-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20"
              data-hs-theme-click-value="dark"
            >
              {theme === "dark" ? (
                <>
                  <svg
                    className="size-4 flex-shrink-0 fill-violet-700"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </svg>
                  <p>Dark</p>
                </>
              ) : (
                <>
                  <svg
                    className="size-4 flex-shrink-0 fill-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </svg>
                  <p>Light</p>
                </>
              )}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -top-2 left-3 flex h-4 w-4 items-center rounded-full border border-black bg-red-200">
              <p className="mx-auto text-xs font-semibold text-black">1</p>
            </div>
            <Link href="/home/notifications">
              <Notification className="h-6 w-6" />
            </Link>
          </div>
        </header>
      </div>
    </div>
  );
}
