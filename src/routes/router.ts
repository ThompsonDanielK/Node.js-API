import express from 'express';
import postController from '../app/controllers/post.controller';
import commentController from '../app/controllers/comment.controller';

const router = express.Router();

// Post routes
router.post('/createPost', postController.createPost);
router.get('/getPost', postController.getPost);
router.get('/getPosts', postController.getPosts);
router.put('/updatePost', postController.updatePost);
router.delete('/deletePost', postController.deletePost);

// Comment routes
router.post('/createComment', commentController.createComment);
router.get('/getComment', commentController.getComment);
router.get('/getComments', commentController.getComments);
router.put('/updateComment', commentController.updateComment);
router.delete('/deleteComment', commentController.deleteComment);

export = router;
