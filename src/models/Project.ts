import {sequelize} from '../starter/dbConnection'

import { Optional, Model, DataTypes,CreationOptional,InferAttributes,InferCreationAttributes,DataType  } from 'sequelize'

class Project extends Model<InferAttributes<Project>, InferCreationAttributes<Project>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: string;
    declare stack: string;
    declare image: CreationOptional<string>;
    declare project_link: string;
    declare visibility: CreationOptional<boolean>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Project.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: new DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: new DataTypes.STRING,
        allowNull: false
    },
    stack: {
        type: new DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: new DataTypes.STRING,
        allowNull: true
    },
    project_link: {
        type: new DataTypes.STRING,
        allowNull: false
    },
    visibility: {
        type: new DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue : true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    },
    {
        sequelize
    }
);

export default Project