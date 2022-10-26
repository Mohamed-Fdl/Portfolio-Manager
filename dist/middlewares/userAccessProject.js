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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAccessProject = void 0;
const dbConnection_1 = require("../starter/dbConnection");
const sequelize_1 = require("sequelize");
const userAccessProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield dbConnection_1.sequelize.query("SELECT * FROM `projects` WHERE UserId = ? AND id = ?", {
            replacements: [req.user.data.id, req.params.id],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (project.length === 0)
            return res.status(403).json({ error: true, message: 'You are not authorized to access this project.', data: null });
        next();
    }
    catch (err) {
        return res.status(500).json({
            error: true,
            message: 'Oups..!Something went wrong :(',
            data: null,
        });
    }
});
exports.userAccessProject = userAccessProject;
