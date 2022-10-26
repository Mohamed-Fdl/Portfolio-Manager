"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    let token = '';
    if (req.headers['x-auth-token']) {
        token = req.headers['x-auth-token'].toString();
        let SECRET_KEY = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
        try {
            let decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
            req.user = decoded;
            next();
        }
        catch (err) {
            return res.status(401).json({
                error: true,
                message: 'Not authorized',
                data: null,
            });
        }
    }
    else {
        return res.status(400).json({
            error: true,
            message: 'Bad request',
            data: null,
        });
    }
};
exports.default = auth;
