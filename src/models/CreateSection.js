import mongoose, { Schema } from "mongoose";

const createSectionSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  assignments: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      dueDate: {
        type: Date,
      },
    },
  ],
  meetings: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      link: {
        type: String,
      },
    },
  ],
  tutorials: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      link: {
        type: String,
      },
    },
  ],
  assignmentSubmitting: [
    {
      studentId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      assignmentId: {
        type: String,
        required: true,
      },
      pdfUrl: {
        type: String,
        required: true,
      },
      submittedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export default mongoose.models.CreateSection ||
  mongoose.model("CreateSection", createSectionSchema);
