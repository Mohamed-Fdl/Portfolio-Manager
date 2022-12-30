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
const dbConnection_1 = require("../starter/dbConnection");
const project_1 = require("../helpers/validators/project");
const generalHelpers_1 = __importDefault(require("../helpers/generalHelpers"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const Project_1 = __importDefault(require("../models/Project"));
const sequelize_1 = require("sequelize");
const multerConfig_1 = __importDefault(require("../helpers/multerConfig"));
const userAccessProject_1 = require("../middlewares/userAccessProject");
//load env variables
dotenv_1.default.config();
let router = express_1.default.Router();
router.post('/', [auth_1.default, multerConfig_1.default.single('image')], function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, project_1.ProjectValidator)(req.body))
            return res.status(400).json({ error: true, message: 'Bad request.Make sure you send good data format.', data: null });
        req.body.image = '';
        req.body.UserId = req.user.data.id;
        if (req.file) {
            req.body.image = (0, generalHelpers_1.default)(req.file.filename);
        }
        try {
            let project = yield Project_1.default.create(req.body);
            return res.status(200).json({
                error: false,
                message: 'Project created successfully.',
                data: project.toJSON(),
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
router.get('/', auth_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const projects = yield dbConnection_1.sequelize.query("SELECT * FROM `projects` WHERE UserId = ? ", {
                replacements: [req.user.data.id],
                type: sequelize_1.QueryTypes.SELECT
            });
            return res.status(200).json({
                error: false,
                message: 'Retriving all projects of ' + req.user.data.email,
                data: projects,
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
router.get('/:id', auth_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const project = yield Project_1.default.findOne({ where: { id: req.params.id } });
            return res.status(200).json({
                error: false,
                message: 'Retriving the project (id : ' + req.params.id + ') of ' + req.user.data.email,
                data: project,
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
router.get('/getUserProjects/:email', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield User_1.default.findOne({ where: { email: req.params.email } });
            const projects = yield dbConnection_1.sequelize.query("SELECT * FROM `projects` WHERE UserId = ? AND visibility = ?", {
                replacements: [user === null || user === void 0 ? void 0 : user.id, true],
                type: sequelize_1.QueryTypes.SELECT
            });
            return res.status(200).json({
                error: false,
                message: 'Retriving all visible projects of ' + req.params.email,
                data: projects,
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
router.put('/:id', [auth_1.default, userAccessProject_1.userAccessProject, multerConfig_1.default.single('image')], function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, project_1.ProjectValidator)(req.body))
            return res.status(400).json({ error: true, message: 'Bad request.Make sure you send good data format.', data: null });
        req.body.UserId = req.user.data.id;
        if (req.file) {
            req.body.image = (0, generalHelpers_1.default)(req.file.filename);
        }
        try {
            yield Project_1.default.update(req.body, { where: { id: req.params.id } });
            let project = yield Project_1.default.findOne({ where: { id: req.params.id } });
            return res.status(200).json({
                error: false,
                message: 'Project updated successfully.',
                data: project,
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
router.put('/visibility/:id', [auth_1.default, userAccessProject_1.userAccessProject], function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, project_1.changeProjectVsibilityValidator)(req.body))
            return res.status(400).json({ error: true, message: 'Bad request.Make sure you send good data format.', data: null });
        let { visibility } = req.body;
        try {
            yield Project_1.default.update({ visibility }, { where: { id: req.params.id } });
            let project = yield Project_1.default.findOne({ where: { id: req.params.id } });
            return res.status(200).json({
                error: false,
                message: 'Project visibility updated successfully.',
                data: project,
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
router.delete('/:id', [auth_1.default, userAccessProject_1.userAccessProject], function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let project = yield Project_1.default.findOne({ where: { id: req.params.id } });
            yield Project_1.default.destroy({
                where: {
                    id: req.params.id
                }
            });
            return res.status(200).json({
                error: false,
                message: 'Project deleted successfully.',
                data: project,
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
exports.default = router;
