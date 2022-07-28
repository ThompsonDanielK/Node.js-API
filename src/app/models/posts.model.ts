import mongoose, { Schema, Model, model } from "mongoose";
import { IPostModel } from "../interfaces/posts.interface";

const postSchema = new Schema({
    content: String,
    created_time: Date,
    updated_time: Date,
    user_id: Number
});

export const PostModel: Model<IPostModel> = model<IPostModel>('post', postSchema);