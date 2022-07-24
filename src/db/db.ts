import mongoose from "mongoose";
import { PostModel } from "./posts/posts.model";

let database: mongoose.Connection;

export const connect = () => {

    const uri = "mongodb://127.0.0.1:27017/local";

    if (database) {
        return;
    }

    mongoose.connect(uri);

    database = mongoose.connection;

    database.once("open", async () => {
        console.log("Connected to database");
    });

    database.on("error", () => {
        console.log("Error connecting to database");
    });
};

export const disconnect = () => {

    if (!database) {
        return;
    }
    
    mongoose.disconnect();
};