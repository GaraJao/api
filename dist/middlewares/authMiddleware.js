"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = require("../repositories/userRepository");
const api_errors_1 = require("../helpers/api-errors");
const authMiddleware = async (req, res, next) => {
    var _a;
    const { authorization } = req.headers;
    if (!authorization)
        throw new api_errors_1.UnauthorizedError('Sem autorização');
    const token = authorization.split(' ')[1];
    const { user_id } = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '');
    const user = await userRepository_1.userRepository.findOneBy({ id: user_id });
    if (!user)
        throw new api_errors_1.UnauthorizedError('Sem autorização');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...loggedUser } = user;
    req.user = loggedUser;
    next();
};
exports.authMiddleware = authMiddleware;
