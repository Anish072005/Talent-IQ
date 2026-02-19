import Session from "../models/session.js";
import { Chatclient, streamClient } from "../lib/stream.js";
export async function createSession(req, res) {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    if (!problem || !difficulty) {
      return res
        .status(400)
        .json({ messsage: "Problem and difficulty are required" });
    }
    //generate a unique call id for stream video call

    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });
    //create a stream video call

    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: clerkId,
        custom: { problem, difficulty, sessionId: session._id.toString() },
      },
    });
    const channel = Chatclient.channel("messaging", callId, {
      name: `${problem} Session`,
      created_by_id: clerkId,
      members: [clerkId],
    });
    await channel.create();

    res
      .status(201)
      .json({
        message: "Session created successfully",
        sessionId: session._id,
        callId,
      });
  } catch (error) {
    console.log("Error creating session:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function getActiveSessions(_, res) {
  try {
    const sessions = await Session.find({ status: "active" })
      .populate("host", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json(sessions);
  } catch (error) {
    console.log("Error in getActiveSessions", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function getMyRecentSessions(req, res) {
  try {
    //where user is either host or participant and session is completed

    const userId = req.user._id;
    const sessions = await Session.find({
      status: "completed",
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(sessions);
  } catch (error) {
    console.log("Error in getMyRecentSessions", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getSessionsById(req, res) {
  try {
    const { id } = req.params;
    const session = await Session.findById(id)
      .populate("host", "name email profileImage clerkId")
      .populate("participant", "name email profileImage clerkId");

    if (!session) return res.status(400).json({ message: "Session not Found" });

    res.status(200).json({ session });
  } catch (error) {
    console.log("Error in getSessionById controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function joinSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await Session.findById(id);

    if (!session) return res.status(404).json({ message: "Session not found" });


    if(session.status!=="active"){
        return res.status(400).json({message:"cannot join completed session"});

    }

if(session.host.toString()==userId.toString()){
    return res.status(400).json({message:"Host cannot join thier own session as participant"});
}
//check if session is already full -has a participant
    if (session.participant)
      return res.status(404).json({ message: "session is full" });

    session.participant = userId;
    await session.save();

    const channel = Chatclient.channel("messaging", session.callId);

    await channel.addMembers([clerkId]);

    res.status(200).json({ session });
  } catch (error) {
    console.log("Error in joinSession controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function endSession(req, res) {
  try {
    const {id} = req.params;
    const userId = req.user._id;
    const session = await Session.findById(id);

    if (!session) return res.status(404).json({ message: "Session not Found" });

    //check if user is the host
    if (session.host.toString() != userId.toString()) {
      return res
        .status(403)
        .json({ message: "Only the host can end the session" });
    }
    //check if session is Already completed
    if (session.status == "completed") {
      return res.status(400).json({ message: "Session is already completed" });
    }

    //delete stream video call

    const call = streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });

    //delete stream chat channel

    const channel = Chatclient.channel("messaging", session.callId);
    await channel.delete();
    
    
    
    session.status = "completed";
    await session.save();

    res.status(200).json({ message: "Session ended Succesfuly" });
  } catch (error) {
    console.log("Error in endSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
 