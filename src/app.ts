import http from 'http';
import express, { Express } from 'express';
import routes from './routes/router';
import { connect } from "./app/utils/db";
import * as redis from 'redis';

const router: Express = express();
const redisClient = redis.createClient({
    socket: {
        host: '127.0.0.1',
        port: 6379
    },
    password: 'Lolo1459*'
});

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

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

// Connect to Redis server
redisClient.connect();

// Connect to MongoDB via Mongoose
connect();

// Server startup and port listening
let server: http.Server;
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
if (process.env.NODE_ENV !== 'test') {
    server = httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
} else {
    server = httpServer.listen(0, () => console.log(`The server is running on port 0`));
}

export { server, redisClient };
export default router;

