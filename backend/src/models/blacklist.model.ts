import mongoose, { Document, Schema } from "mongoose";

interface IBlacklist extends Document {
    token: string;
}

const blacklistSchema: Schema<IBlacklist> = new Schema(
    {
        token: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

blacklistSchema.index({ token: 1 }, { unique: true });

const Blacklist = mongoose.model<IBlacklist>("Blacklist", blacklistSchema);

export default Blacklist;
