"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading/Loading";
import Swal from "sweetalert2";

export default function Teachers() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const {
    data: teachers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin_dashboard"],
    queryFn: () => fetch("/api/admin/teachersinfo").then((res) => res.json()),
  });

  // Approve handler
  const handleApprove = async (id) => {
    Swal.fire({
      title: "Approve this teacher?",
      text: "This teacher will be able to access the platform",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0000FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Approve",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`/api/admin/teachersinfo`, {
          method: "PUT",
          body: JSON.stringify({ isVerified: true, id }),
        });

        if (response.ok) {
          Swal.fire({
            title: "Approved!",
            text: "This teacher will be able to access the platform",
            icon: "success",
          });
          refetch();
        } else {
          Swal.fire({
            title: "Failed!",
            text: "Failed to approve teacher",
            icon: "error",
          });
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  // Filtered and searched data
  const filtered = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" ? true : t.isVerified === true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className=" w-full">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-blue-700">
            Teachers
          </h1>
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs border-blue-300 focus:border-blue-500 focus:ring-blue-200"
          />
        </div>
        {/* Filter Buttons */}
        <div className="flex gap-3 mb-4">
          <Button
            variant={filter === "all" ? "primary" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "verified" ? "primary" : "outline"}
            onClick={() => setFilter("verified")}
          >
            Verified
          </Button>
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
                  Resume
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">
                    No teachers found.
                  </td>
                </tr>
              ) : (
                filtered.map((t, idx) => (
                  <tr key={t._id} className="hover:bg-blue-50 transition">
                    <td className="px-4 py-3 font-semibold">{idx + 1}</td>
                    <td className="px-4 py-3">{t.name}</td>
                    <td className="px-4 py-3">{t.email}</td>
                    <td className="px-4 py-3">{t.phone}</td>
                    <td className="px-4 py-3">
                      <a
                        href={t.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline hover:text-blue-800"
                      >
                        Resume
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      {t.isVerified === true ? (
                        <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">
                          Verified
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-semibold">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {t.isVerified === false ? (
                        <button
                          onClick={() => handleApprove(t._id)}
                          className="text-xs px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-semibold cursor-pointer"
                        >
                          Approve
                        </button>
                      ) : null}
                    </td>
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
