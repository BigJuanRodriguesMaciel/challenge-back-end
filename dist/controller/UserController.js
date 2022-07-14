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
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, confirmPassword } = req.body;
    if (!name)
        return res.status(422).json({ msg: 'O nome é obrigatório' });
    if (!email)
        return res.status(422).json({ msg: 'O email é obrigatório' });
    if (!password)
        return res.status(422).json({ msg: 'A senha é obrigatório' });
    if (!confirmPassword)
        return res.status(422).json({ msg: 'A confirmaçāo de senha é obrigatório' });
    if (password != confirmPassword)
        return res.status(422).json({ msg: 'Os campos senha e confirmar senha devem coicider' });
    const userExists = yield User_1.User.findOne({ email });
    if (userExists)
        return res.status(422).json({ msg: 'E-mail já cadastrado' });
    const salt = yield bcrypt_1.default.genSalt(12);
    const passwordHash = yield bcrypt_1.default.hash(password, salt);
    const user = new User_1.User({
        name,
        email,
        password: passwordHash
    });
    try {
        yield user.save();
        res.status(201).json({
            msg: 'Usuário cadastrado com sucesso'
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Algo de errado ocorreu ao tentar criar conta.',
            error
        });
    }
});
const logInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email)
        return res.status(422).json({ msg: 'O email é obrigatório' });
    if (!password)
        return res.status(422).json({ msg: 'A senha é obrigatório' });
    const user = yield User_1.User.findOne({ email: email });
    const validPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!user || !validPassword) {
        return res.status(404).json({
            msg: 'Usuário ou senha inválido(s)'
        });
    }
    try {
        const secret = process.env.SECRET;
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            name: user.name,
            email: user.email,
        }, `${secret}`);
        return res.status(422).json({
            msg: `Seja bem-vindo ao sistema ${user.name}`,
            token
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Algo de errado ocorreu ao tentar criar conta.',
            error
        });
    }
});
exports.default = {
    registerUser,
    logInUser
};
