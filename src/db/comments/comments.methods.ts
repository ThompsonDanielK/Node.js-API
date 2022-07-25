import { IComment, ICommentDocument } from "./comments.types";

export async function createComment(this: ICommentDocument, newComment: IComment): Promise<ICommentDocument> {
    return this.createComment(newComment);
}

export async function updateComment(this: ICommentDocument, updatedComment: IComment, _id: String): Promise<ICommentDocument> {
    return this.updateComment(_id, updatedComment);
}