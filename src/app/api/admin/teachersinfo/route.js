import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";

export async function GET(req) {
  try {
    await connectDB();
    const teachers = await User.find({ role: "Teacher" });
    return NextResponse.json(teachers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch teachers" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const { id, isVerified } = await req.json();
    const teacher = await User.updateOne({ _id: id }, { isVerified });
    if (teacher.modifiedCount > 0) {
      return NextResponse.json(
        { message: "Teacher updated successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to update teacher" },
        { status: 500 }
      );
    }
    return NextResponse.json(teacher);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update teacher" },
      { status: 500 }
    );
  }
}
