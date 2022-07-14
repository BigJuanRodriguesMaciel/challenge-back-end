import express, { Express } from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config();
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

const mongoDBConnect = () => {
    mongoose.connect(
        `mongodb+srv://${DB_USER}:${DB_PASS}@challenges.icrsf.mongodb.net/?retryWrites=true&w=majority`,
    ).then(
        () => console.log(`⚡️[server]: App connected to MongoDB`)
    ).catch(
        (err) => console.log(`${err}`)
    )
}

export default mongoDBConnect;
