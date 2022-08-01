import mongoose from "mongoose";

let database: mongoose.Connection;

export const connect = async () => {

    let uri;

    if (process.env.NODE_ENV !== 'test') {
        uri = process.env.MONGODB_PATH_PROD;
    } else {
        uri = process.env.MONGODB_PATH_TEST;
    }

    if (database) {
        return;
    }

    await mongoose.connect(uri!);

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