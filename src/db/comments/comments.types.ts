import mongoose, { Document, Model } from "mongoose";

export interface IComment {
    content: String;
    created_time: Date;
    updated_time: Date;
    post_id: mongoose.Types.ObjectId;
    user_id: Number;
}

export interface ICommentDocument extends IComment, Document {
    createComment: (newComment: IComment) => Promise<ICommentDocument>;
    updateComment: (_id: String, updatedComment: IComment) => Promise<ICommentDocument>;
}

export interface ICommentModel extends Model<ICommentDocument> {
    getComment: (
        {
            _id
        }: {_id: string}
    ) => Promise<ICommentDocument>;

    getComments: (
        {
            post_id
        }: {post_id: string}
    ) => Promise<ICommentDocument[]>;

    deleteComment: (
        {
            _id
        }: {_id: string}
    ) => Promise<ICommentDocument>;
}