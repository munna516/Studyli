import connectDB from "@/lib/mongoose";
import Course from "@/models/Course";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    const role = searchParams.get("role");

    if (role == "Student") {
      const courses = await Course.find({
        "enrolledStudents.studentId": id,
      });
      return NextResponse.json(courses);
    } else if (role == "Teacher") {
      // check the is verified or not
      const user = await User.findById(id);
      if (!user.isVerified) {
        return NextResponse.json(
          { message: "User is not verified" },
          { status: 401 }
        );
      }
      const courses = await Course.find({
        "author.id": id,
      });
      return NextResponse.json(courses);
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch courses", error: error.message },
      { status: 500 }
    );
  }
}
