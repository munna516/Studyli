import connectDB from "@/lib/mongoose";
import Course from "@/models/Course";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req) {
  try {
    await connectDB();

    const courses = await Course.find({ isActive: true }).sort({
      createdAt: -1,
    });

    const withoutEnrollmentKey = courses.map((course) => {
      const { enrollmentKey, ...rest } = course.toObject();
      return rest;
    });

    return NextResponse.json(withoutEnrollmentKey);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch courses", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const courseData = await req.json();
    const enrollmentKey = "key" + crypto.randomBytes(8).toString("hex");
    courseData.enrollmentKey = enrollmentKey;
    const course = await Course.create(courseData);
    return NextResponse.json(
      { message: "Course created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create course" },
      { status: 500 }
    );
  }
}
