import mongoose from "mongoose";

interface UserInterface {
    name: String,
    email: String,
    password: String
}

export const User = mongoose.model<any>('User', {
    name: String,
    email: String,
    password: String
});
