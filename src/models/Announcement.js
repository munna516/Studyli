import mongoose, { Schema } from "mongoose";

const announcementSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type:String,
        required:true,
    }
})

export default mongoose.models.Announcement || mongoose.model("Announcement", announcementSchema);