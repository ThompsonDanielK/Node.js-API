import { Request, Response } from 'express';
import { PostModel } from '../models/posts.model';
import { redisClient } from '../../app';

// POST request to create a post.
const createPost = async (req: Request, res: Response) => {

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

    const currentDate = new Date();

    const newPost = {
        content: req.body.content,
        user_id: req.body.user_id,
        created_time: currentDate,
        updated_time: currentDate
    };

    let result: any;

    try {
        result = await PostModel.create(newPost);
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

// GET request to retrieve post by _id passed in as a query parameter
const getPost = async (req: Request, res: Response) => {
    let result: any;

    if (!req.query._id) {
        return res.status(400).json({
            message: 'The _id query parameter must not be null or an empty string.'
        });
    }
    
    try {
        let queryResult = await redisClient.get(`${req.query._id}`);

        if (queryResult) {
            result = JSON.parse(queryResult);
        } else {
            result = await PostModel.findOne({ _id: req.query._id });
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
            message: 'The queried post does not exist.'
        });
    }
    
    return res.status(200).json({
        message: result
    });
};

// GET request to retrieve all posts
const getPosts = async (req: Request, res: Response) => {
    let result: any;
    
    try {
        let queryResult = await redisClient.get(`posts`);

        if (queryResult) {
            result = JSON.parse(queryResult);
        } else {
            result = await PostModel.find();
            redisClient.set(`posts`, JSON.stringify(result));
        }
        redisClient.expire(`posts`, 300);
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

// PUT request to update a post.
const updatePost = async (req: Request, res: Response) => {

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

    const updatedPost = {
        content: req.body.content,
        user_id: req.body.user_id,
        updated_time: currentDate
    };

    let result: any;

    try {
        result = await PostModel.findOneAndUpdate(req.body._id, updatedPost, {new: true});
        if (result) {
            redisClient.set(`${req.body._id}`, JSON.stringify(result));
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error has occurred.'
        });
    }

    if (result == null) {
        return res.status(404).json({
            message: 'The queried post does not exist.'
        });
    }

    return res.status(200).json({
        message: result
    });
};

// DELETE request to delete post by _id passed in as a query parameter
const deletePost = async (req: Request, res: Response) => {
    let result: any;

    if (!req.query._id) {
        return res.status(400).json({
            message: 'The _id query parameter must not be null or an empty string.'
        });
    }
    
    try {
        result = await PostModel.findOneAndDelete({ _id: req.query._id });
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

export default { createPost, getPost, getPosts, updatePost, deletePost };