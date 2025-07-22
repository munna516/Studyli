"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader as DialogHeaderShad,
  DialogTitle as DialogTitleShad,
  DialogFooter as DialogFooterShad,
  DialogClose,
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading/Loading";
import Swal from "sweetalert2";

export default function Blogs() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    thumbnail: "",
    title: "",
    description: "",
  });

  const {
    data: blogs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) return <Loading />;

  const handleOpenAdd = () => {
    setEditId(null);
    setForm({ thumbnail: "", title: "", description: "" });
    setDialogOpen(true);
  };

  const handleOpenEdit = (blog) => {
    setEditId(blog._id);
    setForm({
      thumbnail: blog.thumbnail,
      title: blog.title,
      description: blog.description,
    });
    setDialogOpen(true);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!form.title || !form.description || !form.thumbnail) {
      toast.error("Please fill all the fields");
      return;
    }
    if (editId) {
      try {
        const res = await fetch(`/api/blogs`, {
          method: "PUT",
          body: JSON.stringify({ id: editId, ...form }),
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
    } else {
      try {
        const res = await fetch("/api/blogs", {
          method: "POST",
          body: JSON.stringify(form),
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
    setDialogOpen(false);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/blogs`, {
            method: "DELETE",
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
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl">Blogs</CardTitle>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="primary"
                onClick={handleOpenAdd}
                className="ml-auto"
              >
                + Add Blog
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeaderShad>
                <DialogTitleShad>
                  {editId ? "Edit Blog" : "Add Blog"}
                </DialogTitleShad>
              </DialogHeaderShad>
              <div className="space-y-4">
                <Input
                  name="thumbnail"
                  placeholder="Thumbnail Link"
                  value={form.thumbnail}
                  onChange={handleChange}
                />
                <Input
                  name="title"
                  placeholder="Blog Title"
                  value={form.title}
                  onChange={handleChange}
                />
                <Textarea
                  name="description"
                  placeholder="Blog Description"
                  value={form.description}
                  onChange={handleChange}
                  rows={7}
                />
              </div>
              <DialogFooterShad className="flex justify-end pt-2">
                <Button variant="primary" onClick={handleSave}>
                  {editId ? "Save Changes" : "Save"}
                </Button>
              </DialogFooterShad>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border-b text-left">#</th>
                  <th className="p-2 border-b text-left">Title</th>
                  <th className="p-2 border-b text-left">Description</th>
                  <th className="p-2 border-b text-left">Post Date</th>
                  <th className="p-2 border-b text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {blogs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-400">
                      No blogs found.
                    </td>
                  </tr>
                )}
                {blogs.map((blog, index) => (
                  <tr key={blog._id} className="border-b hover:bg-gray-50">
                    <td className="p-2 align-top whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="p-2 align-top max-w-xs break-words">
                      {blog.title}
                    </td>
                    <td className="p-2 align-top max-w-md break-words">
                      {blog.description.slice(0, 50)}...
                    </td>
                    <td className="p-2 align-top whitespace-nowrap">
                      {blog.date.split("06:00:00")[0]}
                    </td>
                    <td className="p-2 align-top text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="mr-2"
                        onClick={() => handleOpenEdit(blog)}
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4 cursor-pointer" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(blog._id)}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
