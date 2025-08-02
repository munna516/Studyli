import Course from "@/models/Course";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("id");
    const studentId = searchParams.get("studentId");
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    const isEnrolled = course.enrolledStudents.some(
      (student) => student.studentId?.toString() === studentId
    );
    return NextResponse.json( isEnrolled , { status: 200 });
  } catch (error) {
    console.error("Error checking enrollment:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
