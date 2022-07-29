import mongoose from "mongoose";

let database: mongoose.Connection;

export const connect = async () => {

    let uri;

    if (process.env.NODE_ENV !== 'test') {
        uri = "mongodb://127.0.0.1:27017/local";
    } else {
        uri = "mongodb://127.0.0.1:27017/test";
    }

    if (database) {
        return;
    }

    await mongoose.connect(uri);

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
    
    mongoose.connection.close();
};