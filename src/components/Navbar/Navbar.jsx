import React from "react";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 flex justify-between items-center">
      <div className="text-2xl font-bold mr-10">Navbar</div>
      <div>
        <Button variant="outline">Login</Button>
      </div>
    </div>
  );
}
