"use client";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { LayoutDashboard, Menu, UserRound, Users,  } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../../../../public/assets/image/logo.jpg";

const navMain = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Teachers", icon: Users, href: "/admin/teachers" },
  { label: "Students", icon: UserRound, href: "/admin/students" },
];

export default function Sidebar({
  isSidebarOpen,
  mobileSidebar,
  setMobileSidebar,
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isActive = (href) => {
    return pathname === href;
  };
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
    toast.success("Signed out successfully");
  };
  const SidebarContent = (
    <div className={`flex flex-col ${isSidebarOpen ? "px-4" : ""}`}>
      {/* Profile */}
      <div className="flex flex-col items-center pt-4">
        {isSidebarOpen && (
          <div>
            <Image src={logo} alt="StudyLi" width={120} height={120} />
          </div>
        )}
        <div
          className={`text-sm  mt-2 font-bold uppercase ${
            mobileSidebar ? "text-black " : "text-blue-600"
          }`}
        >
          Admin
        </div>
      </div>
      {/* Main Navigation */}
      <div className="px-6 mt-4">
        <div
          className={`text-xs ${
            mobileSidebar ? "text-black " : "text-black-300 "
          } font-semibold mb-3`}
        >
          MAIN
        </div>
        <nav className="flex flex-col gap-1">
          {navMain.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md hover:text-blue-500 transition ${
                isActive(item.href)
                  ? "text-blue-500 bg-blue-100 "
                  : `${mobileSidebar ? "text-black " : "text-gray-600 "}`
              }`}
            >
              <item.icon className="w-5 h-5 lg:w-7 lg:h-7 font-semibold " />
              {(isSidebarOpen || mobileSidebar) && (
                <span className="text-sm lg:text-base font-semibold">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden md:flex  justify-center`}>{SidebarContent}</div>

      {/* Mobile Sidebar */}
      <div className="flex md:hidden  ">
        <Sheet
          open={mobileSidebar}
          onOpenChange={setMobileSidebar}
          className=""
        >
          <SheetTrigger asChild>
            <button className="p-2 m-2 rounded-md border border-gray-200 bg-green-500 shadow">
              <Menu />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <VisuallyHidden>
              <SheetTitle></SheetTitle>
            </VisuallyHidden>
            <div className="h-full overflow-y-auto hide-scrollbar text-black">
              {SidebarContent}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
