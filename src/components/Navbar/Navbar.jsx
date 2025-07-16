"use client";
import { FaRegUser } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
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
import Image from "next/image";
import logo from "../../../public/assets/image/logo.jpg";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { SheetTitle } from "../ui/sheet";
import { Menu } from "lucide-react";
export default function Navbar() {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (
    pathName.includes("login") ||
    pathName.includes("register") ||
    pathName.includes("admin")
  ) {
    return null;
  }
  const isActive = (href) => pathName === href;
  const handleSignOut = () => {
    toast.success("Logged out successfully");
    signOut({
      callbackUrl: "/",
    });
  };
  const navLinks = [
    { name: "Home", href: "/" },
    ...(session?.user
      ? [
          { name: "Dashboard", href: "/dashboard" },
          { name: "My Courses", href: "/my-courses" },
        ]
      : []),
    {
      name: "Blog",
      href: "/blogs",
    },
    {
      name: "Announcements",
      href: "/announcement",
    },
    { name: "Contact", href: "/contact" },
  ];
  return (
    <div className="border-b border-gray-200 bg-white py-5 fixed top-0 left-0 z-50 w-full">
      <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between">
        {/* Mobile: Logo left, Hamburger right */}
        <div className="flex items-center justify-between w-full md:hidden">
          <Link href="/" className="text-4xl font-bold text-blue-500">
            <Image src={logo} alt="StudyLi" width={130} height={100} />
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-8 w-8" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-center py-6 border-b">
                  <Link href="/" className="text-2xl font-bold text-blue-500">
                    <Image src={logo} alt="StudyLi" width={100} height={80} />
                  </Link>
                </div>
                <div className="flex flex-col gap-4 px-6 py-6 flex-1">
                  {navLinks.map((link) => (
                    <Link href={link.href} key={link.name} className="w-full">
                      <h1
                        className={`text-blue-500 font-bold text-lg hover:text-blue-500 hover:bg-blue-100 rounded-md px-2 py-1 ${
                          isActive(link.href) ? "bg-blue-100 text-blue-500" : ""
                        }`}
                      >
                        {link.name}
                      </h1>
                    </Link>
                  ))}
                </div>
                <div className="border-t px-6 py-4">
                  {session?.user ? (
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/profile`}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <User className="h-4 w-4 text-blue-500" />
                        <span className="text-blue-500 font-bold">Profile</span>
                      </Link>
                      <Button
                        variant="ghost"
                        className="flex items-center gap-2 text-red-600 dark:text-red-400 cursor-pointer p-0"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4 text-red-500" />
                        <span className="font-bold text-red-500">Logout</span>
                      </Button>
                    </div>
                  ) : (
                    <Link href="/login">
                      <Button variant="primary" className="w-full">
                        <FaRegUser className="mr-2" />
                        Login
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {/* Desktop: Logo, nav links, user menu */}
        <div className="hidden md:flex items-center justify-between w-full">
          <div className="flex items-center gap-32">
            <div>
              <Link href="/" className="text-4xl font-bold text-blue-500">
                <Image src={logo} alt="StudyLi" width={130} height={100} />
              </Link>
            </div>
            <div className="flex items-center gap-10">
              {navLinks.map((link) => (
                <Link href={link.href} key={link.name}>
                  <h1
                    className={`text-blue-500 font-bold text-lg hover:text-blue-500 hover:bg-blue-100 rounded-md px-2 py-1 ${
                      isActive(link.href) ? "bg-blue-100 text-blue-500" : ""
                    }`}
                  >
                    {link.name}
                  </h1>
                </Link>
              ))}
            </div>
          </div>
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
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
    </div>
  );
}
