import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import CouncilRequest from "@/models/CouncilRequest";

export async function POST(request) {
  try {
    await connectDB();
    const { studentId, courseId, subject, message } = await request.json();

    if (!studentId || !courseId || !subject || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if a pending request already exists for this student and course
    const existingPendingRequest = await CouncilRequest.findOne({
      studentId,
      courseId,
      status: "pending",
    });

    if (existingPendingRequest) {
      return NextResponse.json(
        { message: "A council request is already pending for this course" },
        { status: 400 }
      );
    }

    const councilRequest = new CouncilRequest({
      studentId,
      courseId,
      subject,
      message,
    });

    await councilRequest.save();

    return NextResponse.json(
      { message: "Council request submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating council request:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("studentId");
    const courseId = searchParams.get("courseId");
    const teacherId = searchParams.get("teacherId");

    if (teacherId) {
      // Get all council requests for a teacher's course
      const allRequests = await CouncilRequest.find({
        courseId,
      }).populate("studentId", "name email");

    

      return NextResponse.json({ requests: allRequests || [] });
    } else if (studentId && courseId) {
      // Get the latest request for a student
      const existingRequest = await CouncilRequest.findOne({
        studentId,
        courseId,
      }).sort({ createdAt: -1 });

      

      return NextResponse.json({ request: existingRequest });
    } else {
      
      return NextResponse.json(
        { message: "Invalid parameters" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error fetching council request:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const { requestId, action, meetDate, meetLink } = await request.json();

    if (!requestId || !action) {
      return NextResponse.json(
        { message: "Request ID and action are required" },
        { status: 400 }
      );
    }

    const updateData = {};

    if (action === "approve") {
      if (!meetDate || !meetLink) {
        return NextResponse.json(
          { message: "Meet date and link are required for approval" },
          { status: 400 }
        );
      }
      updateData.status = "approved";
      updateData.meetDate = meetDate;
      updateData.meetLink = meetLink;
    } else if (action === "reject") {
      updateData.status = "rejected";
    }

    const updatedRequest = await CouncilRequest.findByIdAndUpdate(
      requestId,
      updateData,
      { new: true }
    );

    if (!updatedRequest) {
      return NextResponse.json(
        { message: "Council request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Council request ${action}d successfully`,
      request: updatedRequest,
    });
  } catch (error) {
    console.error("Error updating council request:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
