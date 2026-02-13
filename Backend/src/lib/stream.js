import {streamChat} from "stream-chat";
import {env} from "./env.js";
const apiKey=env.STREAM_API_KEY
const apiSecret=env.STREAM_API_SECRET

if(!apiKey || !apiSecret){
console.log("STREAM_API_KEY || STREAM_API_SECRET IS missing");
}

export const Chatclient=streamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser=async(userData)=>{
    try {
        await Chatclient.upsertUser(userData)
        console.log("stream upserting successfully",userData);
    } catch (error) {
        console.log("Error upserting stream user:",error);
    }
}

export const DeleteStreamUser=async(userId)=>{
    try {
        await Chatclient.deleteUser(userId)
   console.log("Deleted stream user with ID:", userId);
    } catch (error) {
        console.log("Error deleting stream user:",error);
    }
}
//todo add another method to generateToken