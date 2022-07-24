import express from 'express';
import controller from '../controllers/postController';

const router = express.Router();

router.get('', controller.getHelloWorld);
router.post('/createPost', controller.createPost);

export = router;
