"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { FaEdit } from "react-icons/fa";
import { Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Loading from "@/components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function CoursePage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [status, setStatus] = useState("");

  const {
    data: courses,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["courses_admin_end"],
    queryFn: async () => {
      const res = await fetch("/api/admin/courses");
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) return <Loading />;

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setStatus(course.isActive ? "Active" : "Deactive");
    setOpenDialog(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/admin/courses`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: status, id: selectedCourse._id }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data?.message);
        refetch();
      } else {
        toast.error(data?.message);
      }
      
    } catch (error) {
      toast.error(error?.message);
    }
    setOpenDialog(false);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure to delete  course?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/admin/courses`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          });
          const data = await res.json();
          if (res.ok) {
            toast.success(data?.message);
            refetch();
          } else {
            toast.error(data?.message);
          }
        } catch (error) {
          toast.error(error?.message);
        }
      }
    });
  };
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>All course</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-3 px-4 text-left">SL</th>
                  <th className="py-3 px-4 text-left">Course Title</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-left">Author</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, idx) => (
                  <tr key={course._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{idx + 1}</td>
                    <td className="py-2 px-4">{course.title}</td>
                    <td className="py-2 px-4">
                      {course.description.slice(0, 50)} .....
                    </td>
                    <td className="py-2 px-4">{course?.author?.name}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          course.isActive === true
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {course.isActive == true ? "Active" : "Deactive"}
                      </span>
                    </td>
                    <td className="py-2 px-4 flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(course)}
                      >
                        <FaEdit className="h-5 w-5 text-blue-600" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(course._id)}
                      >
                        <Trash className="h-5 w-5 text-red-600" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Course Status</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="block mb-3 font-medium">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Deactive">Deactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={
                      status ===
                      (selectedCourse?.isActive ? "Active" : "Deactive")
                    }
                  >
                    Submit
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
