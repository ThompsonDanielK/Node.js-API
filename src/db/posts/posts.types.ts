import { Document, Model, ObjectId } from "mongoose";

export interface IPost {
    content: String;
    created_time: Date;
    updated_time: Date;
    id: String;
    user_id: Number;
}

export interface IPostDocument extends IPost, Document {
    id:String;
    createPost: (newPost: IPost) => Promise<IPostDocument>;
}

export interface IPostModel extends Model<IPostDocument> {
    getPost: (
        {
            _id
        }: {_id: string}
      ) => Promise<IPostDocument>;
}