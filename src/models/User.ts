import {sequelize} from '../starter/dbConnection'

import Project from './Project';

import { Optional, Model, DataTypes,CreationOptional,InferAttributes,InferCreationAttributes,DataType  } from 'sequelize'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare firstname: string;
    declare email: string;
    declare password: string;
    declare title: string;
    declare description: string | null;
    declare isAdmin: boolean;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

User.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: new DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: new DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: new DataTypes.STRING,
        allowNull: false,
        unique : true
    },
    password: {
        type: new DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: new DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: new DataTypes.STRING,
        allowNull: true
    },
    isAdmin: {
        type: new DataTypes.STRING,
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    },
    {
        sequelize
    }
);

//Association
User.hasMany(Project);

Project.belongsTo(User);

export default User