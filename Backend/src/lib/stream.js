import pkg from "stream-chat";
import { env } from "./env.js";
import {StreamClient} from "@stream-io/node-sdk";
const { StreamChat } = pkg;

const apiKey = env.STREAM_API_KEY;
const apiSecret = env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.log("STREAM_API_KEY || STREAM_API_SECRET is missing");
}



export const  streamClient = new  StreamClient(apiKey, apiSecret); // will be used for vedio-calls features


export const Chatclient = StreamChat.getInstance(apiKey, apiSecret); // will be used for chats features


export const upsertStreamUser = async (userData) => {
  try {
    await Chatclient.upsertUser(userData);
    console.log("stream upserting successfully");
  } catch (error) {
    console.log("Error upserting stream user:", error);
  }
};

export const DeleteStreamUser = async (userId) => {
  try {
    await Chatclient.deleteUser(userId);
    console.log("Deleted stream user with ID:", userId);
  } catch (error) {
    console.log("Error deleting stream user:", error);
  }
};
