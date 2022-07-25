import mongoose, { Schema } from "mongoose";
import { createComment, updateComment } from "./comments.methods";
import { getComment, getComments, deleteComment } from "./comments.statics"

const CommentSchema = new Schema({
    content: String,
    created_time: Date,
    updated_time: Date,
    post_id: mongoose.Types.ObjectId,
    user_id: Number,
});

CommentSchema.methods.createComment = createComment;
CommentSchema.methods.updateComment = updateComment;

CommentSchema.statics.getComment = getComment;
CommentSchema.statics.getComments = getComments;
CommentSchema.statics.deleteComment = deleteComment;

export default CommentSchema;