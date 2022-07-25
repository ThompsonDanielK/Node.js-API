import mongoose, { Document, Model, ObjectId } from "mongoose";

export interface IComment {
    content: String;
    created_time: Date;
    updated_time: Date;
    post_id: mongoose.Types.ObjectId;
    user_id: Number;
}

export interface ICommentDocument extends IComment, Document {}

export interface ICommentModel extends Model<ICommentDocument> {}