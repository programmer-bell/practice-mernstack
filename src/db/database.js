import mongoose from "mongoose";

const connectDB = () => {
    const mongoURI = process.env.MONGODB_URI;
    mongoose.connect(mongoURI)
        .then(() => {
            console.log("✅ Connection established to MongoDB");
        })
        .catch((error) => {
            console.error("❌ MongoDB connection failed:", error);
        });
};

export default connectDB;
