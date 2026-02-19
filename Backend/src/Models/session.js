import moongose from "mongoose";
const sessionSchema = new moongose.Schema(
  {
    problem: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
    },
    host: {
      type: moongose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participant: {
      type: moongose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
    enum: ["pending", "active", "completed"],
 default: "active",
    },
    callId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const session = moongose.model("Session", sessionSchema);

export default session;
