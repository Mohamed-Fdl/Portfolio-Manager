const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/db.sqlite'
});

const connection = (async () => {
    await sequelize.sync({ force: true });
});

export  {sequelize,connection} 



