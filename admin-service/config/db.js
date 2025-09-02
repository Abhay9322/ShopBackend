import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/adminServiceDB");
        console.log("Admin Service MongoDB connected");

    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};