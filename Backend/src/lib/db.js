import mongoose from "mongoose"
import {env} from "./env.js"
export const connectDB=async()=>{
    try {
if(!env.DB_URL){    
    throw new Error("❌Database URL is not set in environment variables")
}   
        const conn =await mongoose.connect(env.DB_URL)
        console.log("✅Connected to MongoDB successfully")
    } catch (error) {
        console.error("❌Error connecting to MongoDB:", error)
            process.exit(1) // 0 means success ,1 means failure
    }
}