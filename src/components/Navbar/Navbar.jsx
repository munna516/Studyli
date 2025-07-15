"use client";
import { FaRegUser } from "react-icons/fa6";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session } = useSession();
  const pathName = usePathname();
  const handleSignOut = () => {
    toast.success("Logged out successfully");
    signOut({
      callbackUrl: "/",
    });
  };
  return pathName.includes("login") || pathName.includes("register") ? (
    ""
  ) : (
    <div className="border-b border-gray-200 bg-white py-5 fixed top-0 left-0 z-50 w-full">
      <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between">
        <div className="">
          <div>
            <Link href="/" className="text-4xl font-bold text-blue-500">
              StudyLi
            </Link>
          </div>
        </div>
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                {/*  */}
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    className="border-2 border-blue-500 p-1 rounded-full cursor-pointer"
                    src={
                      session?.role === "Teacher"
                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-sWEFanhM2eQ-uVO5Jdf4reo2nmvSNPClEA&s"
                        : "https://w7.pngwing.com/pngs/548/984/png-transparent-student-child-learning-course-curriculum-write-the-little-boy-english-pencil-people-thumbnail.png"
                    }
                    alt="Profile"
                  />
                  <AvatarFallback>
                    {session?.user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Hello{" "}
                    <span className="font-bold text-blue-500 ml-2">
                      {session?.user?.name || "User"}
                    </span>
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/profile`} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4 text-blue-500" />
                  <span className="text-blue-500 font-bold">Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 dark:text-red-400 cursor-pointer"
                onClick={() => handleSignOut()}
              >
                <LogOut className="mr-2 h-4 w-4 font-bold text-red-500" />
                <span className="font-bold text-red-500">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="">
            <Link href="/login">
              <Button variant="primary">
                <span className="">
                  <FaRegUser />
                </span>
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
