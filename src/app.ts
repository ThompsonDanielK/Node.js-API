import http from 'http';
import express, { Express } from 'express';
import routes from './routes/router';
import { connect } from "./app/utils/db";

const router: Express = express();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Server configuration
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

// Route configuration for posts
router.use('/', routes);
router.use('/createPost', routes);
router.use('/getPost', routes);
router.use('/getPosts', routes);
router.use('/updatePost', routes);
router.use('/deletePost', routes);

// Route configuration for comments
router.use('/createComment', routes);
router.use('/getComment', routes);
router.use('/getComments', routes);
router.use('/updateComment', routes);
router.use('/deleteComment', routes);

// Error handling
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

// Connect to MongoDB via Mongoose
connect();

// Server startup and port listening
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
export const server = httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

export default router;

