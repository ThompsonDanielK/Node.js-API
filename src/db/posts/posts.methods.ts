import { IPost, IPostDocument } from "./posts.types";

export async function createPost(this: IPostDocument, newPost: IPost): Promise<IPostDocument> {
    return this.createPost(newPost);
}

export async function updatePost(this: IPostDocument, updatedPost: IPost, _id: String): Promise<IPostDocument> {
    return this.updatePost(_id, updatedPost);
}