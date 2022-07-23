import redis from 'redis';
import * as mongoose from "mongoose";

const redisClient = redis.createClient();
const uri: string = "mongodb://127.0.0.1:27017/local";


// test
const placeholder = async () => {
    return null;
};