import mongoose, { Schema, Model, model } from 'mongoose';
import { ICommentModel } from '../interfaces/comments.interface';

const commentSchema = new Schema({
    content: String,
    created_time: Date,
    updated_time: Date,
    post_id: mongoose.Types.ObjectId,
    user_id: Number,
});

export const CommentModel: Model<ICommentModel> = model<ICommentModel>('comment', commentSchema);