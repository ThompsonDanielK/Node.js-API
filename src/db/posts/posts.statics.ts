import { IPostModel, IPostDocument } from "./posts.types";
import { Model } from "mongoose";

export async function getPost(this: Model<IPostDocument>, _id: String): Promise<IPostDocument> {
    const record = await this.findOne({ _id });

    if (record) {
        return record;
    } else {
        return Promise.reject("No Record Found.");
    }
}