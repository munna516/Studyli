"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import logo from "../../../public/assets/image/logo.jpg";

export default function Footer() {
  const pathName = usePathname();
  return pathName.includes("login") ||
    pathName.includes("register") ||
    pathName.includes("admin") ? (
    ""
  ) : (
    <div className="border-t border-gray-200 bg-white w-full">
      <div className="max-w-[1440px] mx-auto px-4 py-10 ">
        <div className="flex items-center justify-between">
          <div>
            <Image src={logo} alt="StudyLi" width={150} height={100} />
            <p className="text-gray-500 text-lg w-1/2">
              Studyli is an online Learning Management System (LMS) for schools
              and universities.It is a platform for students to learn and
              teachers to teach.
            </p>
          </div>
          <div className="flex items-center gap-4 font-bold text-xl flex-col">
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-700 hover:underline"
            >
              Home
            </Link>
            <Link
              href="/courses"
              className="text-blue-500 hover:text-blue-700 hover:underline"
            >
              Courses
            </Link>
            <Link
              href="/contact"
              className="text-blue-500 hover:text-blue-700 hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
        <hr className="w-full border-gray-300 border my-10" />
        <h1 className="text-gray-500 text-lg text-center">
          &copy; {new Date().getFullYear()} StudyLi. All rights reserved.
        </h1>
      </div>
    </div>
  );
}
