"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDBConnect = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const mongoDBConnect = () => {
    mongoose_1.default.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@challenges.icrsf.mongodb.net/?retryWrites=true&w=majority`).then(() => app.listen(port, () => {
        console.log(`⚡️[server]: App connected to MongoDB`);
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    })).catch((err) => console.log(`${err}`));
};
exports.mongoDBConnect = mongoDBConnect;
