import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, description, thumbnail } = await req.json();

    const date = new Date().toISOString().slice(0, 10);
    const blog = await Blog.create({ title, description, thumbnail, date });
    return NextResponse.json(
      { message: "Blog created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Blog creation failed", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const blogs = await Blog.find()
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { message: "Blog fetching failed", error },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id, title, description, thumbnail } = await req.json();
    const blog = await Blog.findByIdAndUpdate(id, {
      title,
      description,
      thumbnail,
    });
    return NextResponse.json(
      { message: "Blog updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Blog update failed", error },
      { status: 500 }
    );
  }
}


export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const blog = await Blog.findByIdAndDelete(id);
    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Blog deletion failed", error }, { status: 500 });
  }
}