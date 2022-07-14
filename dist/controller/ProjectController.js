"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Project_1 = __importDefault(require("../models/Project"));
// const teste = async (req, res) => {
// app.get('/teste/:id', checkToken, async (req, res) => {
//     return res.status(422).json({msg: `entrou ${req.params.id}`})
// })
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, tasks, ownerId } = req.body;
    if (!title)
        return res.status(201).json({
            msg: `O titulo é obrigatório`,
        });
    if (!ownerId)
        return res.status(201).json({
            msg: `O Id do usuário é obrigatório`,
        });
    try {
        yield Project_1.default.create({ title, tasks, ownerId });
        return res.status(201).json({
            msg: `Projeto cadastrado com sucesso`,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: `Algo de errado ocorreu ao tentar cadastrar projeto ${error}`,
            error
        });
    }
});
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project_1.default.findOne({
            _id: req.params.id
        });
        return res.status(201).json({
            msg: `Projeto localizado com sucesso`,
            project
        });
    }
    catch (error) {
        res.status(422).json({
            msg: `Algo de errado ocorreu ao tentar localizar projeto ${error}`,
            error
        });
    }
});
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = req.body;
    try {
        yield Project_1.default.updateOne({ _id: req.params.id }, project);
        res.status(200).json({
            msg: `Projeto atualizada com sucesso`,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: `Algo de errado ocorreu ao tentar atualizar projeto ${error}`,
            error
        });
    }
});
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ownerId = req.params.ownerid;
    console.log(ownerId);
    try {
        const projects = yield Project_1.default.find({ ownerId });
        res.status(200).json({
            msg: `Projetos carregados com sucesso`,
            projects
        });
    }
    catch (error) {
        res.status(422).json({
            msg: `Algo de errado ocorreu ao tentar carregar Projetos ${error}`,
            error
        });
    }
});
exports.default = {
    createProject,
    getProject,
    updateProject,
    getAllProjects
};
