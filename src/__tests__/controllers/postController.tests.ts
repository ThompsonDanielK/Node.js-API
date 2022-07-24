import controller from "../../controllers/postController";
import { Response } from "express";
import { PostModel } from "../../db/posts/posts.model";
import { getMockReq } from '@jest-mock/express'

const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Testing postController', () => {
    test('It creates posts.', async () => {
        const req = getMockReq({
            body: {
                user_id: "1",
                content: "test"
            }
        });

        const mockDbResponse = {
            id: "1",
            content: "test",
            created_time: 0,
            updated_time: 0,
            user_id: 1,
            _id: "1"                      
        };

        jest.spyOn(PostModel, 'create').mockImplementationOnce(() => Promise.resolve(mockDbResponse));

        const res = mockResponse();

        await controller.createPost(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({"message": {"_id": "1", "content": "test", "created_time": 0, "id": "1", "updated_time": 0, "user_id": 1}});
    });

    test('It requires user_id to create posts.', async () => {
        const req = getMockReq({
            body: {
                content: "test"
            }
        });

        const res = mockResponse();

        await controller.createPost(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({"message": "user_id must not be null."});
    });

    test('It requires content to create posts.', async () => {
        const req = getMockReq({
            body: {
                user_id: "1"
            }
        });

        const res = mockResponse();

        await controller.createPost(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({"message": "Content must not be null or an empty string."});
    });
  });