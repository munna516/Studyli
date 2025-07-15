import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const { fullName, email, password, phone, department, resume } =
      await req.json();
    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const passwordHash = await bcrypt.hash(password, 10);
    if (resume.length > 0) {
      const teacher = await User.create({
        name: fullName,
        email,
        password: passwordHash,
        phone,
        department,
        resume,
        role: "Teacher",
        isVerified: false,
      });
      return NextResponse.json({ message: "Teacher registration successful" },
        { status: 200 }
      );
    } else {
      const student = await User.create({
        name: fullName,
        email,
        password: passwordHash,
        phone,
        department,
        role: "Student",
      });
      return NextResponse.json(
        { message: "Student registration successful" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
