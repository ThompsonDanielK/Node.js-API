import express from 'express';
import controller from '../controllers/postController';

const router = express.Router();

router.post('/createPost', controller.createPost);
router.get('/getPost', controller.getPost);
router.get('/getPosts', controller.getPosts);
router.put('/updatePost', controller.updatePost);
router.delete('/deletePost', controller.deletePost)

export = router;
