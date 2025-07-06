import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className=" bg-gray-200 w-full">
      <div className="max-w-[1440px] mx-auto px-4 py-10 ">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-blue-500 mb-3">Studyli</h1>
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
              href="/"
              className="text-blue-500 hover:text-blue-700 hover:underline"
            >
              About
            </Link>
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-700 hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
        <hr className="w-full border-gray-300 border my-10" />
        <h1 className="text-gray-500 text-lg text-center">
          &copy; {new Date().getFullYear()} Studyli. All rights reserved.
        </h1>
      </div>
    </div>
  );
}
