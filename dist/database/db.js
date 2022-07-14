"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const mongoDBConnect = () => {
    mongoose_1.default.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@challenges.icrsf.mongodb.net/?retryWrites=true&w=majority`).then(() => console.log(`⚡️[server]: App connected to MongoDB`)).catch((err) => console.log(`${err}`));
};
exports.default = mongoDBConnect;
