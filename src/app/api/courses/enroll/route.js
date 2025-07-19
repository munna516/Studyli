// import connectDB from "@/lib/mongoose";
// import Course from "@/models/Course";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     await connectDB();
//     const { courseId, studentId } = await req.json();
    
//     // Check if course exists
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return NextResponse.json(
//         { message: "Course not found" },
//         { status: 404 }
//       );
//     }
    
//     // Check if student is already enrolled
//     const isEnrolled = course.enrolledStudents.some(
//       enrollment => enrollment.studentId.toString() === studentId
//     );
    
//     if (isEnrolled) {
//       return NextResponse.json(
//         { message: "Student is already enrolled in this course" },
//         { status: 400 }
//       );
//     }
    
//     // Add student to enrolled students
//     course.enrolledStudents.push({
//       studentId,
//       enrolledAt: new Date()
//     });
    
//     await course.save();
    
//     return NextResponse.json(
//       { message: "Successfully enrolled in course" },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Failed to enroll in course", error: error.message },
//       { status: 500 }
//     );
//   }
// } 