import {requireAuth} from '@clerk/express'

import User from '../Models/User.js';
export const protectRoute=[
    requireAuth(), // This middleware will ensure that the user is authenticated
    async(req,res,next)=>{
try {
     const clerkId=req.auth.userId; // Get the authenticated user's ID from Clerk
     if(!clerkId)return res.status(401).json({msg:"Unauthorrized -Inavlid User"})

        const user=await User.findOne({clerkId})

    if(!user)return res.status(401).json({msg:"User not found"})
      
      //attach the user to the request
        req.user=user

        next();

} catch (error) {
    console.error("Error in proctectRoute Middleware",error);
    res.status(500).json({message:"Internal  Server Error"})
}
    }

] 