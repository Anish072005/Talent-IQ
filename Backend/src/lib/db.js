import mongoose from "mongoose"
import {env} from "./env.js"
export const connectDB=async()=>{
    try {
        const conn =await mongoose.connect(env.DB_URL)
        console.log("✅Connected to MongoDB successfully")
    } catch (error) {
        console.error("❌Error connecting to MongoDB:", error)
            process.exit(1) // 0 means success ,1 means failure
    }
}