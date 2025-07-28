"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { MdCategory } from "react-icons/md";
import { User } from "lucide-react";
import { Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FeaturedCourse() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsFetching(true);
        const response = await fetch("/api/courses/featured-course");
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
  return (
    <div className="my-16 ">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
        Explore Our <span className="text-blue-500">Featured Courses</span>
      </h1>
      <p className="text-gray-500 text-center mb-10">
        Explore our latest and top enrolled course and stay updated with the
        latest courses
      </p>

      {/* Featured Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card
            key={course._id}
            className="overflow-hidden hover:scale-105  duration-300"
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
              <div className="flex items-center justify-between gap-2 mb-4">
                <h1 className="flex  items-center gap-2 text-sm  font-medium">
                  <span className="text-blue-500 text-lg">
                    <MdCategory />
                  </span>{" "}
                  {course.category}
                </h1>
              </div>
              {/* Author Information */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4 text-blue-500" />
                  <span className="text-sm  font-medium">
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
              
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
