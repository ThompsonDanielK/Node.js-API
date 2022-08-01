import mongoose, { Document, Model } from 'mongoose';

export interface IComment {
    content: String;
    created_time: Date;
    updated_time: Date;
    post_id: mongoose.Types.ObjectId;
    user_id: Number;
}

export interface ICommentModel extends IComment, Document {}

export interface CommentDTO extends ICommentModel {}