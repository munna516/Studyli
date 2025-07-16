"use client";
import Loading from "@/components/Loading/Loading";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaClipboardList,
  FaFileAlt,
  FaHeadset,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const stats = [
  {
    title: "Total Student",
    icon: <FaUserGraduate size={32} />, // blue
    count: 1200,
    gradient: "from-blue-400 to-blue-600",
  },
  {
    title: "Total Teacher",
    icon: <FaChalkboardTeacher size={32} />, // purple
    count: 80,
    gradient: "from-purple-400 to-purple-600",
  },
  {
    title: "Total Course",
    icon: <FaBook size={32} />, // green
    count: 35,
    gradient: "from-green-400 to-green-600",
  },
  {
    title: "Active Enrollment",
    icon: <FaClipboardList size={32} />, // orange
    count: 900,
    gradient: "from-orange-400 to-orange-600",
  },
  {
    title: "Submitted Assignment",
    icon: <FaFileAlt size={32} />, // pink
    count: 450,
    gradient: "from-pink-400 to-pink-600",
  },
  {
    title: "Pending Counseling Request",
    icon: <FaHeadset size={32} />, // teal
    count: 12,
    gradient: "from-teal-400 to-teal-600",
  },
];

const barData = [
  { name: "Math", enrollments: 300 },
  { name: "Physics", enrollments: 200 },
  { name: "Chemistry", enrollments: 180 },
  { name: "Biology", enrollments: 150 },
  { name: "English", enrollments: 120 },
  { name: "History", enrollments: 100 },
];

export default function AdminDashboard() {
  
  return (
    <div className="mb-16">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div
            key={stat.title}
            className={`flex items-center justify-between px-5 py-8 rounded-xl shadow-md bg-gradient-to-br ${stat.gradient} text-white transition-transform transform hover:scale-105 duration-300`}
          >
            <div className="flex flex-col gap-4">
              <div className="">{stat.icon}</div>
              <span className="font-semibold text-lg">{stat.title}</span>
            </div>
            <span className="text-3xl font-bold drop-shadow-lg">
              {stat.count}
            </span>
          </div>
        ))}
      </div>
      {/* Bar Chart */}
      <Card className="mt-8 p-4 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 border-0">
        <CardTitle className="text-xl font-semibold text-blue-700 mb-4 text-center">
          Course Wise Enrollment
        </CardTitle>
        <CardContent className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 14 }} />
              <YAxis tick={{ fontSize: 14 }} />
              <Tooltip />
              <Bar dataKey="enrollments" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
