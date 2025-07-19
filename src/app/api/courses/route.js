import connectDB from "@/lib/mongoose";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const courses = await Course.find({ isActive: true }).sort({
      createdAt: -1,
    });

    return NextResponse.json(courses);
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
