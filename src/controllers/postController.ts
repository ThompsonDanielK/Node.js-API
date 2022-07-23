import express, { Request, Response } from "express";

interface Post {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}

// test
const getHelloWorld = async (req: Request, res: Response) => {
    let result: String = 'Hello, World!';
    return res.status(200).json({
        message: result
    });
};

export default { getHelloWorld };