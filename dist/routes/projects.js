"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProjectController_1 = __importDefault(require("../controller/ProjectController"));
const auth_1 = require("../middlewares/auth");
const projectsRoutes = (0, express_1.default)();
projectsRoutes.post('/projects', auth_1.checkToken, ProjectController_1.default.createProject);
projectsRoutes.get('/projects/:ownerid', auth_1.checkToken, ProjectController_1.default.getAllProjects);
projectsRoutes.get('/projects/:id', auth_1.checkToken, ProjectController_1.default.getProject);
projectsRoutes.put('/projects/:id', auth_1.checkToken, ProjectController_1.default.updateProject);
exports.default = projectsRoutes;
