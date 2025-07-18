import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
  thumbnail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
