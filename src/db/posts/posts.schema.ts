import { Schema } from "mongoose";
import { createPost } from "./posts.methods";
import { getPost } from "./posts.statics"

const PostSchema = new Schema({
    content: String,
    created_time: Date,
    updated_time: Date,
    id: String,
    user_id: Number
});

PostSchema.methods.createPost = createPost;

PostSchema.statics.getPost = getPost;

export default PostSchema;