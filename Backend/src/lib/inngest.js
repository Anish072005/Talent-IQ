import {Inngest}from 'inngest';
import {connectDB} from "./db.js"
import User from "../Models/User.js"

export const inngest = new Inngest({ id: "Talent-IQ" });
const syncUser= inngest.createFunction(
{id:"sync/user"}, 
{event:"clerk/user.created"},
async({event})=>{
    await connectDB()
    const {id,email,first_name,last_name,image_url}=event.data

    const newUser={
        clerkId:id,
        email:email[0]?.email,
        name:`${first_name|| ""} ${last_name || ""}`,
        profileImage:image_url,
        }
        await User.create(newUser)
}
)

const deletedUser= inngest.createFunction(
{id:"deleted-user-from-DB"}, 
{event:"clerk/user.deleted"},
async({event})=>{
    await connectDB()
    const {id}=event.data
        await User.deleteOne({clerkId:id})


}
)
export const functions=[syncUser,deletedUser]