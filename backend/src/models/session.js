import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            ref: "users",
            required: [true, " User_id is required"]
        },
        refershToken: {
            type: String,
            required: [true, " refersh token is required"]
        },
        ip: {
            type: String,
            required: [true, " IP address is required"]
        },
        userAgent: {
            type: String,
            required: [true, "User agent is reqired"]
        },
        revoked: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)


const sessionModel = mongoose.model("sessions", sessionSchema)


export default sessionModel