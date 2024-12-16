import mongoose from "mongoose";

async function connectDB() {
    try {
        
        await mongoose.connect(`mongodb+srv://0xday:0bj3P5zl9YT0hxHR@0xday.lku96un.mongodb.net/${process.env.DB_NAME}`); 
        console.log(`Mongo DB Connected to ${process.env.DB_NAME}`);
    } catch (error) {
        console.log(error.message);
    }
}

connectDB();