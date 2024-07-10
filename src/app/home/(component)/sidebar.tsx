"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import {
  Apply,
  Appointments,
  Doctor,
  Home,
  Profile,
  SidebarNotification,
  User,
} from "../../../assets/svg/index";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Link from "next/link";

const userSidebar = [
  {
    path: "/home",
    name: "Home",
    icon: Home,
  },
  {
    path: "/home/appointments",
    name: "Appointments",
    icon: Appointments,
  },
  {
    path: "/home/applydocter",
    name: "Apply",
    icon: Apply,
  },
  {
    path: "/home/profile",
    name: "Profile",
    icon: Profile,
  },
  {
    path: "/home/notifications",
    name: "Notifications",
    icon: SidebarNotification,
  },
];

const adminSidebar = [
  {
    path: "/",
    name: "Home",
    icon: Home,
  },
  {
    path: "/users",
    name: "Users",
    icon: User,
  },
  {
    path: "/docters",
    name: "Doctores",
    icon: Doctor,
  },
  {
    path: "/home/profile",
    name: "Profile",
    icon: Profile,
  },
  {
    path: "/home/notifications",
    name: "Notifications",
    icon: SidebarNotification,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  // const { user } = useSelector((state: any) => state.user);

  const isAdmin = false;

  return (
    <div className="flex flex-col bg-white">
      <div className="fixed inset-y-0 left-0 z-40 m-0 flex w-[250px] shrink-0 flex-col border-r border-r-neutral-200 bg-white transition-all duration-300 ease-in-out">
        <div className="flex h-[96px] shrink-0 items-center justify-between">
          <Image
            src="/logo2.png"
            className="mx-4"
            alt="logo"
            width={100}
            height={100}
          />
        </div>
        <div className="border-neutral-200 dark:border-neutral-700/70 lg:block"></div>
        <div className="relative my-5">
          <div className="flex w-full flex-col font-medium">
            <div className="relative">
              <div className="flex flex-col justify-between bg-white">
                {/* {userSidebar.map((item, index) => (
                  <path
                    href={item.path || "/default-path"}
                    key={index}
                    className="w-full"
                  >
                    <div className="relative w-full">
                      <div
                        className={`flex items-center rounded-xl p-5 ${pathname.includes(item.path) ? "text-blue-600" : "text-black"}`}
                      >
                        <item.icon
                          className={cn({
                            "h-7 w-7 text-blue-600": pathname.includes(
                              item.path,
                            ),
                          })}
                        />
                        <p
                          className={`mx-3 mt-1 text-base font-medium ${pathname.includes(item.path) ? "text-blue-400" : "text-black"}`}
                        >
                          {item.name}
                        </p>
                      </div>
                      {pathname.includes(item.path) && (
                        <motion.div
                          className="top-20.5 absolute left-0 right-0 mx-auto flex h-1 w-48 bg-blue-400"
                          layoutId="navigate-mainsettings"
                        />
                      )}
                    </div>
                  </path>
                ))} */}
                {isAdmin
                  ? adminSidebar.map((item, index) => {
                      const isActive = pathname === item.path;

                      return (
                        <Link href={item.path} key={index} className="w-full">
                          <div className="relative mb-2 w-full">
                            <div
                              className={`flex items-center rounded-xl p-5 ${isActive ? "text-blue-600" : "text-black"}`}
                            >
                              <item.icon
                                className={cn("z-40 h-7 w-7", {
                                  "text-blue-600": isActive,
                                })}
                              />
                              <p
                                className={`z-40 mx-3 mt-1 text-base font-medium ${isActive ? "text-blue-600" : "text-black"}`}
                              >
                                {item.name}
                              </p>
                            </div>
                            {isActive && (
                              <motion.div
                                className={`absolute left-0 right-0 top-4 mx-3 h-10 rounded-md ${isActive ? "bg-sky-100" : ""} border`}
                                layoutId="navigate-mainsettings"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                              />
                            )}
                          </div>
                        </Link>
                      );
                    })
                  : userSidebar.map((item, index) => {
                      const isActive = pathname === item.path;

                      return (
                        <Link href={item.path} key={index} className="w-full">
                          <div className="relative mb-2 w-full">
                            <div
                              className={`flex items-center rounded-xl p-5 ${isActive ? "text-blue-600" : "text-black"}`}
                            >
                              <item.icon
                                className={cn("z-40 h-7 w-7", {
                                  "text-blue-600": isActive,
                                })}
                              />
                              <p
                                className={`z-40 mx-3 mt-1 text-base font-medium ${isActive ? "text-blue-600" : "text-black"}`}
                              >
                                {item.name}
                              </p>
                            </div>
                            {isActive && (
                              <motion.div
                                className={`absolute left-0 right-0 top-4 mx-3 h-10 rounded-md ${isActive ? "bg-sky-100" : ""} border`}
                                layoutId="navigate-mainsettings"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                              />
                            )}
                          </div>
                        </Link>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
