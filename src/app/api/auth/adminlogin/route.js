import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongoose";


export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();
  const user = await User.findOne({ email, role: "Admin" });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
  return NextResponse.json(user, { status: 200 });
}
