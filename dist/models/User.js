"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = require("../starter/dbConnection");
const Project_1 = __importDefault(require("./Project"));
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lastname: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    isAdmin: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: dbConnection_1.sequelize
});
//Association
User.hasMany(Project_1.default);
Project_1.default.belongsTo(User);
exports.default = User;
