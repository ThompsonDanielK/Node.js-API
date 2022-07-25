import { model } from "mongoose";
import { ICommentDocument } from "./comments.types";
import CommentSchema from "./comments.schema";

export const CommentModel = model<ICommentDocument>("post", CommentSchema);