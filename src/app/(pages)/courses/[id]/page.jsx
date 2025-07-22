"use client";
import Loading from "@/components/Loading/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdCategory } from "react-icons/md";

export default function CourseDetails() {
  const { data: session } = useSession();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const {
    data: course,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["course_details"],
    queryFn: async () =>
      fetch(`/api/course-details?id=${params.id}`).then((res) => res.json()),
  });

  if (isLoading) return <Loading />;

  const handleEnroll = async (e) => {
    e.preventDefault();
    const enrollmentKey = e.target.key.value;
    if (!enrollmentKey.trim()) {
      toast.error("Please enter an enrollment key");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/courses/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: course._id,
          studentId: session?._id,
          email: session?.email,
          enrollmentKey: enrollmentKey,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data?.message || "Successfully enrolled in course");

        refetch();
      } else {
        toast.error(data?.message || "Failed to enroll in course");
      }
    } catch (error) {
      toast.error("An error occurred while enrolling");
    } finally {
      e.target.key.value = "";
      setLoading(false);
    }
  };
  return (
    <div className="mt-28 mb-20">
      <div className="w-full  bg-white border border-gray-200 rounded-lg shadow-lg md:flex overflow-hidden relative">
        {/* Thumbnail */}
        <div className="md:w-1/2 flex items-center justify-center p-2">
          <Image
            src={course?.thumbnail}
            alt="Course Thumbnail"
            width={500}
            height={500}
            className=" w-full h-full max-h-70 rounded-2xl"
          />
        </div>
        {/* Right Side */}
        <div className="md:w-1/2  p-6 flex flex-col gap-4 relative">
          {/* Top Row: Title & Edit Toggle */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{course?.title}</h1>
            {session?.role === "Teacher" && (
              <button
                className={`ml-4 px-3 py-1 rounded-full border ${
                  editMode
                    ? "bg-blue-500 text-white cursor-pointer font-semibold border-2 border-blue-300"
                    : "bg-white text-blue-500 cursor-pointer border-2 border-blue-300 hover:bg-blue-500 hover:text-white font-semibold"
                }`}
                onClick={() => setEditMode((prev) => !prev)}
                title="Toggle Edit Mode"
              >
                {editMode ? "Editing" : "Enable Edit Mode"}
              </button>
            )}
          </div>
          {/* Description */}
          <div>
            <p className="text-gray-700">{course?.description}</p>

            <p className="text-gray-700 mt-3 flex items-center gap-2">
              <span className="text-blue-500">
                <MdCategory />
              </span>{" "}
              {course?.category} - {course?.level}
            </p>
          </div>
          {/* Teacher Info */}
          <div>
            <div className="font-semibold mb-1">Teacher Info -</div>
            <div className="flex items-center gap-3">
              <div>
                <div className="font-medium">{course?.author.name}</div>
                <div className="text-sm ">{course?.author.email}</div>
              </div>
            </div>
          </div>
          {/* Enrolled Count */}
          <div className="flex items-center gap-2 mt-2 ">
            <span>Total Enrolled:</span>
            <span className="font-bold text-lg text-blue-500">
              {course?.enrolledStudents.length}
            </span>
          </div>
        </div>
      </div>

      {session?.role === "Student" &&
        !course?.enrolledStudents
          .map((student) => student.studentId)
          .includes(session._id) && (
          <div className="mt-16">
            <h1 className="text-2xl font-bold mb-8 text-center text-red-500">
              You Do not have Access to this course . To access this course
              please enter the enrollment key
            </h1>
            <form
              onSubmit={(e) => handleEnroll(e)}
              className="flex items-center justify-center gap-10"
            >
              <Input
                type="text"
                name="key"
                placeholder="Enter Enrollment Key"
                className="w-80 border-blue-500"
              />
              <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                {loading ? "Enrolling..." : "Enroll Now"}
              </Button>
            </form>
          </div>
        )}

      <div className="mt-20">
        <h1 className="text-center font-bold text-blue-500">
          {editMode
            ? "Here Now can Teacher Create Section and Edit Course Details"
            : "Here Now can Student see the course details"}
        </h1>
      </div>
    </div>
  );
}
// Note: You may need to add Material Icons or use another icon library for the group icon.
