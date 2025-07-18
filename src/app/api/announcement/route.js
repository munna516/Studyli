import Announcement from "@/models/Announcement";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    return NextResponse.json(announcements);
  } catch (error) {
    return NextResponse.json(
      { message: "Announcement fetching failed", error },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { title, description } = await req.json();
    const date = new Date().toISOString().slice(0, 10);
    const announcement = await Announcement.create({
      title,
      description,
      date,
    });
    return NextResponse.json(
      { message: "Announcement created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Announcement creation failed", error },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, title, description } = await req.json();
    const announcement = await Announcement.findByIdAndUpdate(id, {
      title,
      description,
    });
    return NextResponse.json(
      { message: "Announcement updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Announcement update failed", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const announcement = await Announcement.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Announcement deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Announcement deletion failed", error },
      { status: 500 }
    );
  }
}
