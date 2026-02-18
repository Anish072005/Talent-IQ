import{chatClient} from "../lib/stream.js";
export async function getStreamToken(req,res){
try {
    //use clerk id for stream instead of mongoDB id
    const token = chatClient.createToken(req.user.clerkid);
    res.status(200).json({ 
        token ,
        userId:req.user.clerkId,
        name:req.user.name,
        userImage:req.user.image

    });
} catch (error) {
    res.status(500).json({"Internal Server Error": error.message})
}
}
