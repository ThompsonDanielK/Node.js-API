import request from 'supertest';
import router, { server } from '../../app';
import { CommentModel } from '../../app/models/comments.model'
import { IComment } from '../../app/interfaces/comments.interface';
import { IPost } from '../../app/interfaces/posts.interface';
import { Types } from 'mongoose';
import { PostModel } from '../../app/models/posts.model';
import { disconnect } from '../../app/utils/db';
import { redisClient } from "../../app";

describe('comment controller Tests', () => {

    let defaultComment: IComment;
    let defaultPost: IPost;
    const date: Date = new Date();

    const createComment = async () => {
        return await CommentModel.collection.insertOne(defaultComment);
    };

    const createPost = async () => {
        return await PostModel.collection.insertOne(defaultPost);
    };


    const addTestComments = async () => {
        return await CommentModel.collection.insertMany([
            {
                'content': 'Test Content',
                'created_time': date,
                'updated_time': date,
                'user_id': 1,
                'post_id': defaultComment.post_id
            },
            {
                'content': 'Test Content 2',
                'created_time': date,
                'updated_time': date,
                'user_id': 2,
                'post_id': defaultComment.post_id
            }
        ]);
    };


    beforeEach(async () => {
        defaultPost = {
            'content': 'Test Content',
            'created_time': date,
            'updated_time': date,
            'user_id': 1
        };

        const post = await createPost();

        defaultComment = {
            'content': 'Test Content',
            'created_time': date,
            'updated_time': date,
            'user_id': 1,
            'post_id': new Types.ObjectId(post.insertedId.toString())
        };


    });

    afterEach(async () => {
        await CommentModel.deleteMany({});
        await PostModel.deleteMany({});
        await redisClient.FLUSHDB();
        await server.close();
    });

    afterAll(async () => {
        await CommentModel.deleteMany({});
        await PostModel.deleteMany({});
        await disconnect();
        await redisClient.FLUSHDB();
        await server.close();
    });

    describe('/getComments', () => {

        it('should return all comments', async () => {

            await addTestComments();
            const res = await request(router).get('/getComments').query({post_id: defaultComment.post_id.toString()});

            expect(res.status).toEqual(200);
            expect(res.body.message[0].content).toEqual('Test Content');
            expect(res.body.message[1].content).toEqual('Test Content 2');
        });

    });

    describe('/getComment', () => {

        it('should return a comment by given id', async () => {
            await addTestComments();
            const allComments: any = await request(router).get('/getComments').query({post_id: defaultComment.post_id.toString()});

            const res = await request(router).get('/getComment').query({_id:allComments.body.message[0]._id });

            expect(res.status).toEqual(200);
            expect(res.body.message).toHaveProperty('_id', allComments.body.message[0]._id);
        });

        it('should return error 404 for non existing comment id', async () => {
            const badId = '111111111111';
            const res = await request(router).get('/getComment').query({_id:`${badId}` });

            expect(res.status).toEqual(404);
        });
    });

    describe('/createComment', () => {

        it('should return a 400 if request body is missing content', async () => {
            defaultComment.content = '';

            const res = await request(router).post('/createComment').send(defaultComment);

            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('Content must not be null or an empty string.');
        });

        it('should return 400 if request body is missing user_id', async () => {
            defaultComment.user_id = NaN;

            const res = await request(router).post('/createComment').send(defaultComment);

            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('user_id must not be null.');
        });

        it('can create comments', async () => {
            const res = await request(router).post('/createComment').send(defaultComment);

            expect(res.status).toEqual(200);
            expect(res.body.message._id).toBeTruthy();
        });

    });


    describe('/updateComment', () => {

        it('should return a 200 if comment content was updated', async () => {

            const comment = await createComment();

            let newComment = {
                'content': 'Hey, this is new content.',
                'created_time': date,
                'updated_time': date,
                'user_id': 1,
                'post_id': defaultComment.post_id,
                '_id': comment.insertedId.toString()
            };

            const res = await request(router).put(`/updateComment`).send(newComment);

            expect(res.status).toEqual(200);
            expect(res.body.message).toHaveProperty('content', 'Hey, this is new content.');
        });

        it('should return a 400 if comment content is null or an empty string', async () => {

            const comment = await createComment();

            let newComment = {
                'content': '',
                'created_time': date,
                'updated_time': date,
                'user_id': 1,
                'post_id': defaultComment.post_id,
                '_id': comment.insertedId
            };
            const res = await request(router).put(`/updateComment`).send(newComment);

            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('Content must not be null or an empty string.');
        });

        it('should return a 400 if _id is missing', async () => {
            const res = await request(router).put(`/updateComment`).send(defaultComment);

            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('_id must not be null.');
        });

        it('should return a 404 if comment id was not found', async () => {
            const badId = '111111111111';

            let comment = {
                'content': 'Test Content',
                'created_time': date,
                'updated_time': date,
                'user_id': 1,
                'post_id': defaultComment.post_id,
                '_id': badId
            };

            const res = await request(router).put(`/updateComment`).send(comment);

            expect(res.status).toEqual(404);
            expect(res.body.message).toEqual('The queried comment does not exist.');
        });


    });

    describe('/deleteComment', () => {

        it('should return a 200 if comment was deleted', async () => {
            const comment = await createComment();
            const res = await request(router).delete('/deleteComment').query({_id:comment.insertedId.toString() });


            expect(res.status).toEqual(200);
            expect(res.body.message).toHaveProperty('content', 'Test Content');
        });

    });

});