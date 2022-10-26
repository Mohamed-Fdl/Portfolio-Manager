"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = require("../starter/dbConnection");
const sequelize_1 = require("sequelize");
class Project extends sequelize_1.Model {
}
Project.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    stack: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    project_link: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    visibility: {
        type: new sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: dbConnection_1.sequelize
});
exports.default = Project;
