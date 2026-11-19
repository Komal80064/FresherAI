import mongoose from "mongoose";

export const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected db");
    } catch (error) {
        console.log("MongoDB error", error)        
    }
}