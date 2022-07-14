"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    title: String,
    ownerId: String,
    tasks: [
        {
            title: String,
            check: Boolean,
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
exports.default = mongoose_1.default.model('Projects', projectSchema);
