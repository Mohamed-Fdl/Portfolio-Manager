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
const express_1 = __importDefault(require("express"));
const user_1 = require("../helpers/validators/user");
const sign_1 = __importDefault(require("../helpers/sign"));
const User_1 = __importDefault(require("../models/User"));
const underscore_1 = require("underscore");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
//load env variable
dotenv_1.default.config();
let router = express_1.default.Router();
router.post('/register', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, user_1.createUserValidator)(req.body))
            return res.status(400).json({ error: true, message: 'Bad request.Make sure you send good data format.', data: null });
        req.body.isAdmin = false;
        try {
            let hash = yield bcrypt_1.default.hash(req.body.password, Number(process.env.BCRYPT_SALT_ROUND));
            req.body.password = hash;
            const user = yield User_1.default.create(req.body);
            return res.status(200).json({
                error: false,
                message: 'User succesfullly registered.',
                data: (0, underscore_1.omit)(user.toJSON(), 'password'),
            });
        }
        catch (err) {
            return res.status(500).json({
                error: true,
                message: 'Oups..!Something went wrong :(',
                data: err,
            });
        }
    });
});
router.post('/login', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, user_1.loginUserValidator)(req.body))
            return res.status(400).json({ error: true, message: 'Bad request.Make sure you send good data format.', data: null });
        try {
            const user = yield User_1.default.findOne({ where: { email: req.body.email } });
            if (user && bcrypt_1.default.compareSync(req.body.password, user.password)) {
                return res.status(200).json({
                    error: false,
                    message: 'User succesfullly logged.',
                    data: { user: (0, underscore_1.omit)(user.toJSON(), 'password'), token: (0, sign_1.default)({ id: user.id, email: user.email, isAdmin: user.isAdmin }) },
                });
            }
            else {
                return res.status(200).json({
                    error: true,
                    message: 'Your credentials does not match',
                    data: null,
                });
            }
        }
        catch (err) {
            return res.status(500).json({
                error: true,
                message: 'Oups..!Something went wrong :(',
                data: err,
            });
        }
    });
});
exports.default = router;
