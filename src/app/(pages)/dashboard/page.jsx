"use client";
import React from "react";
import {
  FaBookOpen,
  FaCheckCircle,
  FaTasks,
  FaClock,
  FaRegCalendarAlt,
} from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading/Loading";

// Placeholder stats and events
export default function DashboardPage() {
  const { data: session } = useSession();
  let stats;

  const { data: dashboard, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await fetch(
        `/api/dashboard?id=${session?._id}&role=${session?.role}`
      );
      const data = await response.json();
      return data;
    },
    enabled: !!session?._id,
  });

  if(isLoading) return <Loading/>
  if (session?.role === "Teacher") {
    stats = [
      {
        icon: <FaBookOpen className="text-blue-500 text-3xl" />,
        label: "Course Created",
        count: dashboard?.totalCourses,
      },
      {
        icon: <FaCheckCircle className="text-green-500 text-3xl" />,
        label: "Active Course",
        count: dashboard?.activeCourses,
      },
      {
        icon: <FaTasks className="text-purple-500 text-3xl" />,
        label: "Total Enrolled",
        count: dashboard?.totalEnrolledStudents,
      },
      {
        icon: <FaClock className="text-orange-500 text-3xl" />,
        label: "Activities Created",
        count: 2,
      },
    ];
  } else {
    stats = [
      {
        icon: <FaBookOpen className="text-blue-500 text-3xl" />,
        label: "Enrolled Courses",
        count: dashboard?.totalEnrolled,
      },
      {
        icon: <FaCheckCircle className="text-green-500 text-3xl" />,
        label: "Course Completed",
        count: 0,
      },
      {
        icon: <FaTasks className="text-purple-500 text-3xl" />,
        label: "Activities Completed",
        count: 3,
      },
      {
        icon: <FaClock className="text-orange-500 text-3xl" />,
        label: "Activities Due",
        count: 0,
      },
    ];
  }

  const events = [
    {
      title: "Assignment is due",
      date: "Friday, 25 July, 12:00 AM",
      link: "#",
    },
    {
      title: "Assignment is due",
      date: "Friday, 25 July, 12:00 AM",
      link: "#",
    },
    {
      title: "Report Submission is due",
      date: "Saturday, 26 July, 12:00 AM",
      link: "#",
    },
  ];

  return (
    <div className="mt-28 mb-20">
      <div className="mb-5">
        <h1 className="text-2xl font-bold mb-1">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            {session?.user?.name}
          </span>
        </h1>
        <p className="text-sm text-gray-500">
          Here you will see the tasks you have to do.
        </p>
      </div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            className="flex items-center justify-between  bg-blue-50 hover:bg-blue-100 hover:scale-105 transition-all duration-300 rounded-lg shadow p-6 min-w-[200px] border border-gray-300"
          >
            <div className="flex items-center gap-3">
              {stat.icon}
              <span className="font-medium text-gray-700">{stat.label}</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {stat.count}
            </span>
          </div>
        ))}
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Upcoming events
        </h2>
        <div>
          {events.map((event, idx) => (
            <React.Fragment key={event.title + idx}>
              <div className="flex items-start gap-3 py-3">
                <FaRegCalendarAlt className="text-pink-500 text-2xl mt-1" />
                <div className="flex-1">
                  <Link
                    href={event.link}
                    className="font-semibold text-blue-700 hover:underline block"
                  >
                    {event.title}
                  </Link>
                  <div className="text-gray-500 text-sm">{event.date}</div>
                </div>
              </div>
              {idx !== events.length - 1 && <hr className="border-gray-200" />}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-4 text-right">
          <Link
            href="#"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Go to calendar...
          </Link>
        </div>
      </div>
    </div>
  );
}
