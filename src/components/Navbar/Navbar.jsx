"use client";
import { FaRegUser } from "react-icons/fa6";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
  console.log(pathName);
  return pathName.includes("login") || pathName.includes("signup") || pathName.includes("/login/teacher") || pathName.includes("/login/student") || pathName.includes("/signup/teacher") || pathName.includes("/signup/student") ? "" : (
    <div className="bg-gray-200 py-5 fixed top-0 left-0 z-50 w-full">
      <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between">
        <div className="">
          <div>
            <Link href="/" className="text-4xl font-bold text-blue-500">
              Studyli
            </Link>
          </div>
        </div>
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
      </div>
    </div>
  );
}
