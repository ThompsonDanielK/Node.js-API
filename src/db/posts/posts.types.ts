import { Document, Model } from "mongoose";

export interface IPost {
    content: String;
    created_time: Date;
    updated_time: Date;
    user_id: Number;
}

export interface IPostDocument extends IPost, Document {
    createPost: (newPost: IPost) => Promise<IPostDocument>;
    updatePost: (_id: String, updatedPost: IPost) => Promise<IPostDocument>;
}

export interface IPostModel extends Model<IPostDocument> {
    getPost: (
        {
            _id
        }: {_id: string}
    ) => Promise<IPostDocument>;

    getPosts: () => Promise<IPostDocument[]>;

    deletePost: (
        {
            _id
        }: {_id: string}
    ) => Promise<IPostDocument>;
}