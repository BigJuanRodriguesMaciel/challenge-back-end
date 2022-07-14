"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const authRoutes = (0, express_1.default)();
authRoutes.post('/auth/register', UserController_1.default.registerUser);
authRoutes.post('/auth/login', UserController_1.default.logInUser);
exports.default = authRoutes;
