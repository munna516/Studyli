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
});

export default mongoose.models.CreateSection ||
  mongoose.model("CreateSection", createSectionSchema);
