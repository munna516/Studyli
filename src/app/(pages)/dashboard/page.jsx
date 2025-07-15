"use client";

import React from "react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  console.log("this is session", session);
  return (
    <div className="mt-32">
      <h1>Dashboard</h1>
      <p>Welcome {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
    </div>
  );
}
