import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
    content: String,
    created_time: Date,
    updated_time: Date,
    post_id: mongoose.Types.ObjectId,
    user_id: Number,
});

export default CommentSchema;