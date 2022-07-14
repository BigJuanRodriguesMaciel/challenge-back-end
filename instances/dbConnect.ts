import express, { Express } from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

export function mongoDBConnect() {
    mongoose.connect(
        `mongodb+srv://${DB_USER}:${DB_PASS}@challenges.icrsf.mongodb.net/?retryWrites=true&w=majority`
    ).then(
        () => app.listen(port, () => {
            console.log(`⚡️[server]: App connected to MongoDB`);
            console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
        })
    ).catch(
        (err) => console.log(`${err}`)
    )
}
