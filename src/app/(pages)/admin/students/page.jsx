"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading/Loading";

export default function Students() {
  const [search, setSearch] = useState("");

  const { data: students, isLoading } = useQuery({
    queryKey: ["student_info"],
    queryFn: () => fetch("/api/admin/studentinfo").then((res) => res.json()),
  });

  if (isLoading) return <Loading />;

  // Filtered and searched data
  const filtered = students.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="w-full mb-10">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-blue-700">
            Students List
          </h1>
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs border-blue-300 focus:border-blue-500 focus:ring-blue-200"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl  bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase">
                  Dept
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">
                    No students found.
                  </td>
                </tr>
              ) : (
                filtered.map((s, idx) => (
                  <tr key={s._id} className="hover:bg-blue-50 transition">
                    <td className="px-4 py-3 font-semibold">{idx + 1}</td>
                    <td className="px-4 py-3">{s.name}</td>
                    <td className="px-4 py-3">{s.email}</td>
                    <td className="px-4 py-3">{s.phone}</td>
                    <td className="px-4 py-3">{s.department}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
