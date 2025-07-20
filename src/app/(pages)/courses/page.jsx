"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChevronDown, User, BookOpen, Clock, Star } from "lucide-react";
import toast from "react-hot-toast";
import Loading from "@/components/Loading/Loading";
import Link from "next/link";

const categories = [
  "All",
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

export default function Courses() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Dialog state
  const [isEnrollmentDialogOpen, setIsEnrollmentDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollmentKey, setEnrollmentKey] = useState("");
  const [isEnrolling, setIsEnrolling] = useState(false);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsFetching(true);
        const response = await fetch("/api/courses");
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
          setFilteredCourses(data);
        }
      } catch (error) {
        toast.error("Failed to fetch courses");
      } finally {
        setIsFetching(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses based on selected category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        (course) => course.category === selectedCategory
      );
      setFilteredCourses(filtered);
    }
  }, [selectedCategory, courses]);

  const handleEnroll = async (courseId) => {
    if (!session) {
      toast.error("Please login to enroll in courses");
      router.push("/login");
      return;
    }

    if (session.role !== "Student") {
      toast.error("Only students can enroll in courses");
      return;
    }

    // Find the course and open dialog
    const course = courses.find((c) => c._id === courseId);
    setSelectedCourse(course);
    setIsEnrollmentDialogOpen(true);
  };

  const handleEnrollmentSubmit = async () => {
    if (!enrollmentKey.trim()) {
      toast.error("Please enter an enrollment key");
      return;
    }
    setIsEnrolling(true);
    try {
      const response = await fetch("/api/courses/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: selectedCourse._id,
          studentId: session?._id,
          email: session?.email,
          enrollmentKey: enrollmentKey,
        }),
      });

      console.log(response);

      const data = await response.json();

      if (response.ok) {
        toast.success(data?.message || "Successfully enrolled in course");
        setIsEnrollmentDialogOpen(false);
        setEnrollmentKey("");
        setSelectedCourse(null);
        router.push("/my-courses");
      } else {
        toast.error(data?.message || "Failed to enroll in course");
      }
    } catch (error) {
      toast.error("An error occurred while enrolling");
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleDialogClose = () => {
    setIsEnrollmentDialogOpen(false);
    setEnrollmentKey("");
    setSelectedCourse(null);
  };

  const isEnrolled = (courseId) => {
    if (!session) return false;
    const course = courses.find((c) => c._id === courseId);
    return course?.enrolledStudents?.some(
      (enrollment) => enrollment.studentId === session.id
    );
  };

  if (status === "loading" || isFetching) {
    return <Loading />;
  }

  return (
    <div className="mt-28 mb-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">
                Explore Our Courses
              </h1>
              <p className="text-gray-600 text-lg">
                Discover a wide range of courses across different disciplines
              </p>
            </div>

            {/* Category Dropdown */}
            <div className="flex-shrink-0 flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default" className="w-48 justify-between">
                    <span className="truncate">{selectedCategory}</span>
                    <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 max-h-96 overflow-y-auto">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className="cursor-pointer"
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Courses Grid Container with Fixed Height */}
        <div className="min-h-[600px]">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No courses found
              </h3>
              <p className="text-gray-600">
                No courses available for the selected category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card
                  key={course._id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Course Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    {/* Course Title */}
                    <CardTitle className="text-xl font-bold text-blue-500 line-clamp-2">
                      {course.title}
                    </CardTitle>

                    {/* Short Description */}
                    <CardDescription className="text-gray-600 line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Author Information */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 font-medium">
                          {course.author.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>4.8</span>
                      </div>
                    </div>

                    {/* Course Details */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500"></div>
                    </div>

                    {/* Enroll Button */}
                    <div className="flex items-center gap-6 justify-end">
                      <Link href={`/courses/${course._id}`}>
                        <Button variant="primary">View Course</Button>
                      </Link>
                      <Button
                        onClick={() => handleEnroll(course._id)}
                        disabled={isLoading || isEnrolled(course._id)}
                        variant={
                          isEnrolled(course._id) ? "secondary" : "primary"
                        }
                      >
                        {isLoading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : isEnrolled(course._id) ? (
                          "Enrolled"
                        ) : (
                          "Enroll Now"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enrollment Dialog */}
      <Dialog open={isEnrollmentDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-blue-500">
              Enroll in Course
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {selectedCourse && (
                <>
                  <span className="font-medium  text-gray-600">
                    {selectedCourse.title}
                  </span>
                  <br />
                  Please enter the enrollment key provided by your instructor to
                  enroll in this course.
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="enrollmentKey"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enrollment Key
              </label>
              <Input
                id="enrollmentKey"
                type="text"
                placeholder="Enter enrollment key"
                value={enrollmentKey}
                onChange={(e) => setEnrollmentKey(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="primary"
              onClick={handleDialogClose}
              disabled={isEnrolling}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleEnrollmentSubmit}
              disabled={isEnrolling || !enrollmentKey.trim()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {isEnrolling ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Enrolling...
                </div>
              ) : (
                "Enroll Now"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
