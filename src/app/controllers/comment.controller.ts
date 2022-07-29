import express, { Request, Response } from 'express';
import { CommentModel } from '../models/comments.model';
import { redisClient } from '../../app';

// POST request to create a comment.
const createComment = async (req: Request, res: Response) => {

    if (!req.body.content) {
        return res.status(400).json({
            message: 'Content must not be null or an empty string.'
        });
    }

    if (!req.body.post_id) {
        return res.status(400).json({
            message: 'post_id must not be null or an empty string.'
        });
    }

    if (!req.body.user_id) {
        return res.status(400).json({
            message: 'user_id must not be null.'
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

    let result: any;

    try {
        result = await CommentModel.create(newComment);
        if (result) {
            redisClient.set(`${result._doc._id}`, JSON.stringify(result));
            redisClient.expire(`${result._doc._id}`, 300);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error has occurred.'
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
        let queryResult = await redisClient.get(`${req.query._id}`);

        if (queryResult) {
            result = JSON.parse(queryResult);
        } else {
            result = await CommentModel.findOne({ _id: req.query._id });
            redisClient.set(`${req.query._id}`, JSON.stringify(result));
        }
        redisClient.expire(`${req.query._id}`, 300);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error has occurred.'
        });
    }

    if (!result) {
        return res.status(404).json({
            message: 'The queried comment does not exist.'
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
        let queryResult = await redisClient.get(`comments:${req.query.post_id}`);

        if (queryResult) {
            result = JSON.parse(queryResult);
        } else {
            result = await CommentModel.find({ post_id: req.query.post_id});
            redisClient.set(`comments:${req.query.post_id}`, JSON.stringify(result));
        }
        redisClient.expire(`comments:${req.query.post_id}`, 300);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error has occurred.'
        });
    }

    return res.status(200).json({
        message: result
    });
};

// PUT request to update a comment.
const updateComment = async (req: Request, res: Response) => {

    if (!req.body.content) {
        return res.status(400).json({
            message: 'Content must not be null or an empty string.'
        });
    }

    if (!req.body.user_id) {
        return res.status(400).json({
            message: 'user_id must not be null.'
        });
    }

    if (!req.body._id) {
        return res.status(400).json({
            message: '_id must not be null.'
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
        if (result) {
            redisClient.set(`${req.body._id}`, JSON.stringify(result));
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error has occurred.'
        });
    }

    if (!result) {
        return res.status(404).json({
            message: 'The queried comment does not exist.'
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
        if (result) {
            redisClient.del(`${req.query._id}`);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error has occurred.'
        });
    }

    return res.status(200).json({
        message: result
    });
};

export default { createComment, getComment, getComments, updateComment, deleteComment };