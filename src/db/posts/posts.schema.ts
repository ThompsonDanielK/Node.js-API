import { Schema } from "mongoose";
import { createPost } from "./posts.methods";

const PostSchema = new Schema({
    content: String,
    created_time: Date,
    updated_time: Date,
    id: String,
    user_id: Number
});

PostSchema.methods.createPost = createPost;

export default PostSchema;