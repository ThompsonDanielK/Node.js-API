import { model } from "mongoose";
import { IPostDocument } from "./posts.types";
import PostSchema from "./posts.schema";

export const PostModel = model<IPostDocument>("post", PostSchema);