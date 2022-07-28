import request from 'supertest';
import router, { server } from '../../app';
import { PostModel } from '../../app/models/posts.model';
import { IPost } from '../../app/interfaces/posts.interface';
import { disconnect } from '../../app/utils/db';


describe('post controller Tests', () => {

    let defaultPost: IPost;

    const createPost = async () => {
        return await PostModel.collection.insertOne(defaultPost);
    };

    const date: Date = new Date();

    const addTestPosts = async () => {
        await PostModel.collection.insertMany([
            {
                'content': 'Test Content',
                'created_time': date,
                'updated_time': date,
                'user_id': 1
            },
            {
                'content': 'Test Content 2',
                'created_time': date,
                'updated_time': date,
                'user_id': 2
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

    });

    afterEach(async () => {
        await PostModel.deleteMany({});
        await server.close();
    });

    afterAll(async () => {
        await PostModel.deleteMany({});
        await disconnect();
        await server.close();
    });

    describe('/getPosts', () => {

        it('should return all posts', async () => {

            await addTestPosts();
            const res = await request(router).get('/getPosts');

            expect(res.status).toEqual(200);
            expect(res.body.message[0].content).toEqual('Test Content');
            expect(res.body.message[1].content).toEqual('Test Content 2');
        });

    });

    describe('/getPost', () => {

        it('should return a post by given id', async () => {
            await addTestPosts();
            const allPosts: any = await request(router).get('/getPosts');

            const res = await request(router).get('/getPost').query({_id:allPosts.body.message[0]._id });

            expect(res.status).toEqual(200);
            expect(res.body.message).toHaveProperty('_id', allPosts.body.message[0]._id);
        });

        it('should return error 404 for non existing post id', async () => {
            const badId = '111111111111';
            const res = await request(router).get('/getPost').query({_id:`${badId}` });

            expect(res.status).toEqual(404);
        });
    });

    describe('/createPost', () => {

        it('should return a 400 if request body is missing content', async () => {
            defaultPost.content = '';

            const res = await request(router).post(`/createPost`).send(defaultPost);

            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('Content must not be null or an empty string.');
        });

        it('should return 400 if request body is missing user_id', async () => {
            defaultPost.user_id = NaN;

            const res = await request(router).post(`/createPost`).send(defaultPost);

            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('user_id must not be null.');
        });

        it('can create posts', async () => {
            const expected = {
                id: "1",
                content: "test",
                created_time: date,
                updated_time: date,
                user_id: 1,
                _id: "1"                      
            };
    
            jest.spyOn(PostModel, 'create').mockImplementationOnce(() => Promise.resolve(expected));

            const res = await request(router).post(`/createPost`).send(defaultPost);

            expect(res.status).toEqual(200);
            expect(res.body.message._id).toBeTruthy();
        });

    });


    describe('/updatePost', () => {

        it('should return a 200 if post content was updated', async () => {

            const post = await createPost();

            let newPost = {
                'content': 'Hey, this is new content.',
                'created_time': date,
                'updated_time': date,
                'user_id': 1,
                '_id': post.insertedId
            };
            

            const res = await request(router).put(`/updatePost`).send(newPost);

            expect(res.status).toEqual(200);
            expect(res.body.message).toHaveProperty('content', 'Hey, this is new content.');
        });

        it('should return a 400 if post content is null or an empty string', async () => {

            const post = await createPost();

            let newPost = {
                'content': '',
                'created_time': date,
                'updated_time': date,
                'user_id': 1,
                '_id': post.insertedId
            };

            const res = await request(router).put(`/updatePost`).send(newPost);

            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('Content must not be null or an empty string.');
        });

        it('should return a 400 if _id is missing', async () => {

            const res = await request(router).put(`/updatePost`).send(defaultPost);

            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('_id must not be null.');
        });

        it('should return a 404 if post id was not found', async () => {
            const badId = '111111111111';

            let post = {
                'content': 'Test Content',
                'created_time': date,
                'updated_time': date,
                'user_id': 1,
                '_id': badId
            };

            const res = await request(router).put(`/updatePost`).send(post);

            expect(res.status).toEqual(404);
            expect(res.body.message).toEqual('The queried post does not exist.');
        });


    });

    describe('/deletePost', () => {

        it('should return a 200 if post was deleted', async () => {
            const post = await createPost();
            const res = await request(router).delete('/deletePost').query({_id:post.insertedId.toString() });


            expect(res.status).toEqual(200);
            expect(res.body.message).toHaveProperty('content', 'Test Content');
        });

    });

});