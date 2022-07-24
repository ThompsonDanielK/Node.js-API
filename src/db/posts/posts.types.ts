import { Document, Model, ObjectId } from "mongoose";

export interface IPost {
    content: String;
    created_time: Date;
    updated_time: Date;
    id: String;
    user_id: Number;
}

export interface IPostDocument extends IPost, Document<any, any, any> {
    id:String;
    createPost: (newPost: IPost) => Promise<IPostDocument>;
}

export interface IPostModel extends Model<IPostDocument> {}