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

export async function getPosts(this: Model<IPostDocument>): Promise<IPostDocument[]> {
    const record = await this.find();

    if (record.length > 0) {
        return record;
    } else {
        return Promise.reject("No Records Found.");
    }
}

export async function deletePost(this: Model<IPostDocument>, _id: String): Promise<IPostDocument> {
    const record = await this.findOneAndDelete({ _id });

    if (record) {
        return record;
    } else {
        return Promise.reject("No Record Found.");
    }
}