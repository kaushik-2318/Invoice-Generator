import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string).then(() => {
            console.log("Connected to database");
        });
    } catch (err) {
        console.error("Mongodb Connection Error: ", err);
        process.exit(1);
    }
};

export default connectDB;
