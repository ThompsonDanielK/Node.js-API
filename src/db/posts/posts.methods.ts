import { IPost, IPostDocument } from "./posts.types";

export async function createPost(this: IPostDocument, newPost: IPost): Promise<IPostDocument> {
    return this.createPost(newPost);
}