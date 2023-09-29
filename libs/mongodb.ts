//IMPORT MONGOOSE
import mongoose from "mongoose";

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const url = process.env.DATABASE_URL as string;
let connection: typeof mongoose;
// connection function
const connectDb = async () => {
    try {
        if (!connection) connection = await mongoose.connect(url);
        console.log("MongoDB Connected Successfully");
        return connection;
    } catch (err) {
        console.log(err);
    }
};
export default connectDb;
