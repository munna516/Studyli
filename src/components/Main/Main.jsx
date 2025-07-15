"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Main({ children }) {
  const pathName = usePathname();

  return (
    <div
      className={` ${
        pathName.includes("admin")
          ? ""
          : "flex-grow max-w-[1440px] mx-auto px-4 w-full"
      }`}
    >
      {children}
    </div>
  );
}
