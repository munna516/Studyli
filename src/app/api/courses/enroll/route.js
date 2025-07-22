import connectDB from "@/lib/mongoose";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { courseId, studentId, email, enrollmentKey } = await req.json();

    const course = await Course.findOne({
      _id: courseId,
      enrollmentKey,
    });

    if (!course) {
      return NextResponse.json(
        { message: "Invalid Enrollment Key" },
        { status: 400 }
      );
    }

    const isEnrolled = course.enrolledStudents.some(
      (enrollment) => enrollment.studentId.toString() === studentId.toString()
    );

    if (isEnrolled) {
      return NextResponse.json(
        { message: "Student is already enrolled in this course" },
        { status: 400 }
      );
    }

    course.enrolledStudents.push({ studentId, email });
    await course.save();

    return NextResponse.json(
      { message: "Successfully enrolled in course" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to enroll in course", error: error.message },
      { status: 500 }
    );
  }
}
