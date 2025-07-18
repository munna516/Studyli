"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Main({ children }) {
  const pathName = usePathname();

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={` ${
          pathName.includes("admin")
            ? ""
            : "flex-grow max-w-[1440px] mx-auto px-4 w-full"
        }`}
      >
        {children}
      </div>
    </QueryClientProvider>
  );
}
