"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
//load env variable
dotenv_1.default.config();
let getImageLink = (image) => {
    return process.env.APP_URL + '/file/' + image;
};
exports.default = getImageLink;
