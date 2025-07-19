import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Computer Science & Engineering",
      "Electrical & Electronic Engineering",
      "Business Administration",
      "Mechanical Engineering",
      "Textile Engineering",
      "Civil Engineering",
      "Architecture",
      "Pharmacy",
      "Law",
      "Math",
      "Physics",
      "Chemistry",
      "English",
      "Biology",
      "Economics",
      "Accounting",
      "Marketing",
      "Management"
    ],
  },
  author: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  thumbnail: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },
  enrolledStudents: [{
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    email:{
      type: String,
      required: true,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
courseSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Course || mongoose.model("Course", courseSchema); 