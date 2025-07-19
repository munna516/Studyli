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
import { ChevronDown, User, BookOpen, Clock, Star } from "lucide-react";
import toast from "react-hot-toast";
import Loading from "@/components/Loading/Loading";

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

// Sample course data - in a real app, this would come from the API
const sampleCourses = [
  {
    _id: "1",
    title: "Introduction to Computer Science",
    shortDescription:
      "Learn the fundamentals of computer science and programming",
    description:
      "A comprehensive introduction to computer science concepts, algorithms, and programming fundamentals.",
    category: "Computer Science & Engineering",
    author: {
      name: "Dr. Sarah Johnson",
      id: { name: "Dr. Sarah Johnson" },
    },
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    duration: "12 hours",
    level: "Beginner",
    price: 0,
    enrolledStudents: [],
  },
  {
    _id: "2",
    title: "Advanced Mathematics for Engineering",
    shortDescription:
      "Master advanced mathematical concepts for engineering applications",
    description:
      "Deep dive into calculus, linear algebra, and differential equations for engineering students.",
    category: "Math",
    author: {
      name: "Prof. Michael Chen",
      id: { name: "Prof. Michael Chen" },
    },
    thumbnail:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    duration: "15 hours",
    level: "Advanced",
    price: 0,
    enrolledStudents: [],
  },
  {
    _id: "3",
    title: "Business Strategy and Management",
    shortDescription: "Develop strategic thinking and management skills",
    description:
      "Learn essential business strategy concepts and management techniques for modern organizations.",
    category: "Management",
    author: {
      name: "Dr. Emily Rodriguez",
      id: { name: "Dr. Emily Rodriguez" },
    },
    thumbnail:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    duration: "10 hours",
    level: "Intermediate",
    price: 0,
    enrolledStudents: [],
  },
  {
    _id: "4",
    title: "Organic Chemistry Fundamentals",
    shortDescription:
      "Understand the basics of organic chemistry and molecular structures",
    description:
      "Comprehensive study of organic compounds, reactions, and molecular structures.",
    category: "Chemistry",
    author: {
      name: "Prof. David Kim",
      id: { name: "Prof. David Kim" },
    },
    thumbnail:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    duration: "14 hours",
    level: "Intermediate",
    price: 0,
    enrolledStudents: [],
  },
  {
    _id: "5",
    title: "Electrical Circuit Design",
    shortDescription: "Learn to design and analyze electrical circuits",
    description:
      "Practical course on electrical circuit design, analysis, and implementation.",
    category: "Electrical & Electronic Engineering",
    author: {
      name: "Dr. Robert Wilson",
      id: { name: "Dr. Robert Wilson" },
    },
    thumbnail:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    duration: "16 hours",
    level: "Advanced",
    price: 0,
    enrolledStudents: [],
  },
  {
    _id: "6",
    title: "English Literature and Composition",
    shortDescription: "Explore classic literature and improve writing skills",
    description:
      "Study of classic literature and development of advanced writing and analytical skills.",
    category: "English",
    author: {
      name: "Prof. Lisa Thompson",
      id: { name: "Prof. Lisa Thompson" },
    },
    thumbnail:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    duration: "11 hours",
    level: "Beginner",
    price: 0,
    enrolledStudents: [],
  },
];

export default function Courses() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

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

    // setIsLoading(true);
    // try {
    //   const response = await fetch("/api/courses/enroll", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       courseId,
    //       studentId: session.id,
    //     }),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     toast.success("Successfully enrolled in course!");
    //     // Update the course to show as enrolled
    //     setCourses((prevCourses) =>
    //       prevCourses.map((course) =>
    //         course._id === courseId
    //           ? {
    //               ...course,
    //               enrolledStudents: [
    //                 ...course.enrolledStudents,
    //                 { studentId: session.id, enrolledAt: new Date() },
    //               ],
    //             }
    //           : course
    //       )
    //     );
    //   } else {
    //     toast.error(data.message || "Failed to enroll in course");
    //   }
    // } catch (error) {
    //   toast.error("An error occurred while enrolling");
    // } finally {
    //   setIsLoading(false);
    // }
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
    <div className="mt-32 mb-16 min-h-screen">
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
                    <Button
                      onClick={() => handleEnroll(course._id)}
                      disabled={isLoading || isEnrolled(course._id)}
                      className="w-full"
                      variant={isEnrolled(course._id) ? "secondary" : "primary"}
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : isEnrolled(course._id) ? (
                        "Enrolled"
                      ) : (
                        "Enroll Now"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
