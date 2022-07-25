import { Schema } from "mongoose";
import { createPost, updatePost } from "./posts.methods";
import { getPost, getPosts, deletePost } from "./posts.statics"

const PostSchema = new Schema({
    content: String,
    created_time: Date,
    updated_time: Date,
    user_id: Number
});

PostSchema.methods.createPost = createPost;
PostSchema.methods.updatePost = updatePost;

PostSchema.statics.getPost = getPost;
PostSchema.statics.getPosts = getPosts;
PostSchema.statics.deletePost = deletePost;

export default PostSchema;