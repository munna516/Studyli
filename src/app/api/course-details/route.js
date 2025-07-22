import connectDB from "@/lib/mongoose";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const course = await Course.findById(id); // <-- fixed this line
    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
