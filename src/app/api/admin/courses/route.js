import connectDB from "@/lib/mongoose";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const courses = await Course.find({});
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { isActive: status, id } = await req.json(); // Renamed for clarity
  try {
    await connectDB();
    const isActive = status === "Active" ? true : false;
    const course = await Course.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );
    return NextResponse.json(
      { message: "Course status updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();
  try {
    await connectDB();
    const course = await Course.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Course deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
