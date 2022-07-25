import express, { Request, Response } from "express";
import { CommentModel } from "../db/comments/comments.model";
import { ICommentDocument } from "../db/comments/comments.types";

// POST request to create a comment.
const createComment = async (req: Request, res: Response) => {

    if (req.body.content == "" || req.body.content == null) {
        return res.status(400).json({
            message: "Content must not be null or an empty string."
        });
    }

    if (req.body.post_id == "" || req.body.post_id == null) {
        return res.status(400).json({
            message: "post_id must not be null or an empty string."
        });
    }

    if (req.body.user_id == null) {
        return res.status(400).json({
            message: "user_id must not be null."
        });
    }

    const currentDate = new Date();

    const newComment = {
        content: req.body.content,
        user_id: req.body.user_id,
        created_time: currentDate,
        updated_time: currentDate,
        post_id: req.body.post_id
    };

    let result: ICommentDocument;

    try {
        result = await CommentModel.create(newComment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error has occurred."
        });
    }

    return res.status(200).json({
        message: result
    });
};

// GET request to retrieve comment by _id
const getComment = async (req: Request, res: Response) => {
    let result: any;
    
    try {
        result = await CommentModel.findOne({ _id: req.query._id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error has occurred."
        });
    }

    return res.status(200).json({
        message: result
    });
};

// GET request to retrieve all comments
const getComments = async (req: Request, res: Response) => {
    let result: any;
    
    try {
        result = await CommentModel.find({ post_id: req.query.post_id});
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error has occurred."
        });
    }

    return res.status(200).json({
        message: result
    });
};

// PUT request to update a comment.
const updateComment = async (req: Request, res: Response) => {

    if (req.body.content == "" || req.body.content == null) {
        return res.status(400).json({
            message: "Content must not be null or an empty string."
        });
    }

    if (req.body.user_id == null) {
        return res.status(400).json({
            message: "user_id must not be null."
        });
    }

    if (req.body._id == null) {
        return res.status(400).json({
            message: "_id must not be null."
        });
    }

    const currentDate = new Date();

    const updatedComment = {
        content: req.body.content,
        user_id: req.body.user_id,
        updated_time: currentDate
    };

    let result: any;

    try {
        result = await CommentModel.findOneAndUpdate(req.body._id, updatedComment, {new: true});
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error has occurred."
        });
    }

    return res.status(200).json({
        message: result
    });
};

// DELETE request to delete comment by _id
const deleteComment = async (req: Request, res: Response) => {
    let result: any;
    
    try {
        result = await CommentModel.findOneAndDelete({ _id: req.query._id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error has occurred."
        });
    }

    return res.status(200).json({
        message: result
    });
};

export default { createComment, getComment, getComments, updateComment, deleteComment };