import { IComment, ICommentDocument } from "./comments.types";
import { Model } from "mongoose";

export async function getComment(this: Model<ICommentDocument>, _id: String): Promise<ICommentDocument> {
    const record = await this.findOne({ _id });

    if (record) {
        return record;
    } else {
        return Promise.reject("No Record Found.");
    }
}

export async function getComments(this: Model<ICommentDocument>, post_id: String): Promise<ICommentDocument[]> {
    const record = await this.find({ "post_id": post_id });

    if (record.length > 0) {
        return record;
    } else {
        return Promise.reject("No Records Found.");
    }
}

export async function deleteComment(this: Model<ICommentDocument>, _id: String): Promise<ICommentDocument> {
    const record = await this.findOneAndDelete({ _id });

    if (record) {
        return record;
    } else {
        return Promise.reject("No Record Found.");
    }
}