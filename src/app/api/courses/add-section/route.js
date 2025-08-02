import connectDB from "@/lib/mongoose";
import CreateSection from "@/models/CreateSection";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { courseId, section } = await req.json();

    const existingSection = await CreateSection.findOne({ courseId });

    let response;
    if (existingSection) {
      const updateField = `${section.type}s`;
      const { type, ...sectionData } = section;

      response = await CreateSection.findByIdAndUpdate(
        existingSection._id,
        {
          $push: { [updateField]: sectionData },
        },
        { new: true }
      );
    } else {
      const { type, ...sectionData } = section;
      const initialData = {
        courseId,
        assignments: [],
        meetings: [],
        tutorials: [],
      };

      // Add the section to the appropriate array
      initialData[`${type}s`] = [sectionData];

      response = await CreateSection.create(initialData);
    }

    return NextResponse.json({
      message: "Section added successfully",
      response,
    });
  } catch (error) {
    console.error("Error adding section:", error);
    return NextResponse.json(
      { message: "Failed to add section" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const response = await CreateSection.find({ courseId: id });
    if (response.length === 0) {
      return NextResponse.json({ message: "No sections found" }, { status: 404 });
    }
    return NextResponse.json(response[0]);
  } catch (error) {
    console.error("Error fetching sections:", error);
    return NextResponse.json(
      { message: "Failed to fetch sections" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { courseId, sectionId, type } = await req.json();

    // First find the course section document by courseId
    const courseSection = await CreateSection.findOne({ courseId });

    if (!courseSection) {
      return NextResponse.json(
        { message: "Course section not found" },
        { status: 404 }
      );
    }

    // Delete the specific section from the appropriate array using sectionId
    const response = await CreateSection.findByIdAndUpdate(
      courseSection._id,
      {
        $pull: { [type]: { _id: sectionId } },
      },
      { new: true }
    );

    return NextResponse.json({
      message: "Section deleted successfully",
      response,
    });
  } catch (error) {
    console.error("Error deleting section:", error);
    return NextResponse.json(
      { message: "Failed to delete section" },
      { status: 500 }
    );
  }
}
