import connectDB from "@/lib/mongoose";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const role = searchParams.get("role");

    await connectDB();

    if (role === "Teacher") {
      // Find all courses created by this teacher
      const teacherCourses = await Course.find({ "author.id": id });

      const totalCourses = teacherCourses.length;
      const activeCourses = teacherCourses.filter(
        (course) => course.isActive
      ).length;

      // Count total students enrolled across all their courses
      const totalEnrolledStudents = teacherCourses.reduce(
        (sum, course) => sum + course.enrolledStudents.length,
        0
      );

      return NextResponse.json({
        totalCourses,
        activeCourses,
        totalEnrolledStudents,
      });
    } else if (role === "Student") {
      const enrolledCourses = await Course.find({
        enrolledStudents: {
          $elemMatch: { studentId: id },
        },
      });

      const totalEnrolled = enrolledCourses.length;
      return NextResponse.json({
        totalEnrolled,
      });
    }
  } catch (error) {
    console.error("Error fetching student enrollment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
