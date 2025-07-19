"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus, BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import Loading from "@/components/Loading/Loading";

const categories = [
  "Computer Science & Engineering",
  "Electrical & Electronic Engineering",
  "Business Administration",
  "Mechanical Engineering",
  "Textile Engineering",
  "Civil Engineering",
  "Architecture",
  "Pharmacy",
  "Law",
  "Math",
  "Physics",
  "Chemistry",
  "English",
  "Biology",
  "Economics",
  "Accounting",
  "Marketing",
  "Management",
];

const levels = ["Beginner", "Intermediate", "Advanced"];

export default function MyCourses() {
  const { data: session, status } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    thumbnail: "",
    level: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Course title is required";
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "Course title must be at least 5 characters";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.thumbnail.trim()) {
      newErrors.thumbnail = "Thumbnail URL is required";
    } else if (!isValidUrl(formData.thumbnail)) {
      newErrors.thumbnail = "Please enter a valid URL";
    }

    if (!formData.level) {
      newErrors.level = "Please select a level";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 50) {
      newErrors.description = "Description must be at least 50 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          author: {
            name: session?.name,
            id: session?._id,
            email: session?.email,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setIsDialogOpen(false);
        resetForm();
      } else {
        toast.error("Failed to create course. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to create course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      thumbnail: "",
      level: "",
      description: "",
    });
    setErrors({});
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="min-h-screen  mt-32 pb-12">
      <div className="">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">
                My Courses
              </h1>
              <p className="text-gray-600 text-lg">
                {session?.role === "Teacher"
                  ? "Manage your created courses and create new ones"
                  : "View your enrolled courses"}
              </p>
            </div>

            {/* Create Course Button - Only for Teachers */}
            {session?.role === "Teacher" && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="primary" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Course</DialogTitle>
                    <DialogDescription>
                      Fill in the details below to create a new course. All
                      fields are required.
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Row 1: Course Title and Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Course Title *
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter course title"
                          value={formData.title}
                          onChange={(e) =>
                            handleInputChange("title", e.target.value)
                          }
                          className={errors.title ? "border-red-500" : ""}
                        />
                        {errors.title && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.title}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category *
                        </label>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="default"
                              size="lg"
                              className={`w-full justify-between ${
                                errors.category ? "border-red-500" : ""
                              }`}
                            >
                              {formData.category || "Select category"}
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-full max-h-60 overflow-y-auto">
                            {categories.map((category) => (
                              <DropdownMenuItem
                                key={category}
                                onClick={() =>
                                  handleInputChange("category", category)
                                }
                                className="cursor-pointer"
                              >
                                {category}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        {errors.category && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.category}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Thumbnail and Level */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Thumbnail URL *
                        </label>
                        <Input
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          value={formData.thumbnail}
                          onChange={(e) =>
                            handleInputChange("thumbnail", e.target.value)
                          }
                          className={errors.thumbnail ? "border-red-500" : ""}
                        />
                        {errors.thumbnail && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.thumbnail}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Level *
                        </label>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="default"
                              className={`w-full justify-between ${
                                errors.level ? "border-red-500" : ""
                              }`}
                            >
                              {formData.level || "Select level"}
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-full">
                            {levels.map((level) => (
                              <DropdownMenuItem
                                key={level}
                                onClick={() =>
                                  handleInputChange("level", level)
                                }
                                className="cursor-pointer"
                              >
                                {level}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        {errors.level && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.level}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 4: Full Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        placeholder="Detailed description of the course content, objectives, and what students will learn"
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        rows={4}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.description
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.description}
                        </p>
                      )}
                    </div>

                    <DialogFooter>
                      <Button
                        type="button"
                        variant="primary"
                        onClick={resetForm}
                        disabled={isSubmitting}
                      >
                        Reset
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Creating...
                          </>
                        ) : (
                          <>
                            <BookOpen className="h-4 w-4" />
                            Save Course
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {session?.role === "Teacher"
                ? "No courses created yet"
                : "No courses enrolled yet"}
            </h3>
            <p className="text-gray-600">
              {session?.role === "Teacher"
                ? "Create your first course to get started!"
                : "Enroll in courses from the Courses page to see them here."}
            </p>
            {session?.role !== "Teacher" && (
              <Button
                className="mt-4"
                onClick={() => (window.location.href = "/courses")}
              >
                Browse Courses
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
