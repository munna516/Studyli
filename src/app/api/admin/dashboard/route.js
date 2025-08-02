import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import User from "@/models/User";
import Course from "@/models/Course";
import CouncilRequest from "@/models/CouncilRequest";

export const GET = async (req) => {
  try {
    await connectDB();

    // 1. Total Students
    const totalStudents = await User.countDocuments({ role: "Student" });

    // 2. Total Teachers
    const totalTeachers = await User.countDocuments({ role: "Teacher" });

    // 3. Total Courses
    const totalCourses = await Course.countDocuments();

    // 4. Total Enrollments across all courses + courseEnrollCount
    const courses = await Course.find({}, "title enrolledStudents");
    let totalEnrollments = 0;

    const courseEnrollCount = courses.map((course) => {
      const count = course.enrolledStudents.length;
      totalEnrollments += count;
      return {
        name: course.title,
        count,
      };
    });

    // 5. Pending Council Requests
    const pendingCouncilRequests = await CouncilRequest.countDocuments({
      status: "pending",
    });
    return NextResponse.json({
      totalStudents,
      totalTeachers,
      totalCourses,
      totalEnrollments,
      pendingCouncilRequests,
      courseEnrollCount,
    });
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
