import { Document, Model } from 'mongoose';

export interface IPost {
    content: String;
    created_time: Date;
    updated_time: Date;
    user_id: Number;
}

export interface IPostModel extends IPost, Document {}

export interface PostDTO extends IPostModel {}