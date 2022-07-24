import express, { Request, Response } from "express";
import { connect, disconnect } from "../db/db";
import { PostModel } from "../db/posts/posts.model"
import { IPostDocument } from "../db/posts/posts.types";
import iDGenerator from "../utils/iDGenerator";

// test
const getHelloWorld = async (req: Request, res: Response) => {
    let result: String = 'Hello, World!';
    return res.status(200).json({
        message: result
    });
};

// POST request to create a post.
const createPost = async (req: Request, res: Response) => {

    if (req.body.content == "" || req.body.content == null) {
        return res.status(400).json({
            message: "Content must not be null or an empty string."
        })
    }

    if (req.body.user_id == null) {
        return res.status(400).json({
            message: "user_id must not be null."
        })
    }

    const currentDate = new Date();

    const newPost = {
        content: req.body.content,
        user_id: req.body.user_id,
        created_time: currentDate,
        updated_time: currentDate,
        id: iDGenerator.generateID(currentDate)
    };

    let result: IPostDocument;

    try {
        result = await PostModel.create(newPost);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error has occurred."
        })
    }

    return res.status(200).json({
        message: result
    });
};

const getPost = async (req: Request, res: Response) => {
    let result: any;
    
    try {
        result = await PostModel.findOne({ _id: req.query._id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error has occurred."
        })
    }

    return res.status(200).json({
        message: result
    });
};

export default { getHelloWorld, createPost, getPost };