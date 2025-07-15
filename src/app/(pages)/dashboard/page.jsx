"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();

  
  return (
    <div className="mt-32">
      <h1>Dashboard</h1>
      <p>Welcome {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
    </div>
  );
}
