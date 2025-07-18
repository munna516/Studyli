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

export default function Announcements() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const {
    data: announcements,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await fetch("/api/announcement");
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) return <Loading />;

  const handleOpenAdd = () => {
    setEditId(null);
    setForm({ title: "", description: "" });
    setDialogOpen(true);
  };

  const handleOpenEdit = (announcement) => {
    setEditId(announcement._id);
    setForm({
      title: announcement.title,
      description: announcement.description,
    });
    setDialogOpen(true);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!form.title || !form.description) {
      toast.error("Please fill all the fields");
      return;
    }
    if (editId) {
      try {
        const res = await fetch(`/api/announcement`, {
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
        const res = await fetch(`/api/announcement`, {
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

  const handleDelete = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await fetch(`/api/announcement`, {
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
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl">Announcement</CardTitle>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="primary"
                onClick={handleOpenAdd}
                className="ml-auto"
              >
                + Add Announcement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeaderShad>
                <DialogTitleShad>
                  {editId ? "Edit Announcement" : "Add Announcement"}
                </DialogTitleShad>
              </DialogHeaderShad>
              <div className="space-y-4">
                <Input
                  name="title"
                  placeholder="Announcement Title"
                  value={form.title}
                  onChange={handleChange}
                />
                <Textarea
                  name="description"
                  placeholder="Announcement Description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
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
                  <th className="p-2 border-b text-left">Title</th>
                  <th className="p-2 border-b text-left">Description</th>
                  <th className="p-2 border-b text-left">Post Date</th>
                  <th className="p-2 border-b text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {announcements.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-400">
                      No announcements found.
                    </td>
                  </tr>
                )}
                {announcements.map((announcement) => (
                  <tr
                    key={announcement._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-2 align-top max-w-xs break-words">
                      {announcement.title}
                    </td>
                    <td className="p-2 align-top max-w-md break-words">
                      {announcement.description.slice(0, 70)}...
                    </td>
                    <td className="p-2 align-top whitespace-nowrap">
                      {announcement.date.split("T")[0]}
                    </td>
                    <td className="p-2 align-top text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="mr-2"
                        onClick={() => handleOpenEdit(announcement)}
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(announcement._id)}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
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
