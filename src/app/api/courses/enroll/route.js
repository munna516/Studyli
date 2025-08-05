import connectDB from "@/lib/mongoose";
import Course from "@/models/Course";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await connectDB();
    const { courseId, studentId, email, enrollmentKey, name } =
      await req.json();
    console.log(courseId, studentId, email, enrollmentKey, name);

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
        { message: "You already enrolled in this course" },
        { status: 400 }
      );
    }

    course.enrolledStudents.push({ studentId, email });
    await course.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: "Successfully Enrolled in Course",
      html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Enrollment Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <p>Hello ${name},</p>
          <p>
            Thank you for enrolling in the course. Please click the link below to view the course:
          </p>
          <p>
            <a href="${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/courses/${courseId}" style="color: #1a73e8; text-decoration: none;">
              View Course
            </a>
          </p>
          <p>If the link does not work, copy and paste this URL into your browser:</p>
          <p style="word-break: break-all;">${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/courses/${courseId}</p>
          <p>Thank you!<br>StudyLi Team</p>
        </body>
      </html>
    `,
    });

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
