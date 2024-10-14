import Joi, { ValidationError } from "joi";
import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 50,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u,
                "Invalid email format",
            ],
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
    },
    { timestamps: true }
);

export function userSchemaValidation(data: unknown): ValidationError | undefined {
    const Schema = Joi.object({
        name: Joi.string().min(2).max(50).required().trim(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string().min(8).required(),
    });

    const { error } = Schema.validate(data);
    return error;
}

export const userModel: Model<IUser> = mongoose.model<IUser>("user", userSchema);
