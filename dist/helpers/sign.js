"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
//load env variable
dotenv_1.default.config();
let SECRET_KEY = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
let sign = (data) => {
    return jsonwebtoken_1.default.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), data: data }, SECRET_KEY);
};
exports.default = sign;
