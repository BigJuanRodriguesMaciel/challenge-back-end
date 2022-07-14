"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TaskController_1 = __importDefault(require("../controller/TaskController"));
const tasksRoutes = (0, express_1.default)();
tasksRoutes.post('/tasks', TaskController_1.default.createTask);
tasksRoutes.get('/tasks', TaskController_1.default.getAllTasks);
tasksRoutes.get('/tasks/:id', TaskController_1.default.getTask);
tasksRoutes.put('/tasks/:id', TaskController_1.default.updateTask);
exports.default = tasksRoutes;
