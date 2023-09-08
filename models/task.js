const Sequelize =require('sequelize');
const sequelize = require('../util/database');
const Task= sequelize.define('task',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    title:{type:Sequelize.STRING,allowNull:false},
    media:Sequelize.STRING,
    description:Sequelize.TEXT,
    status:{
    type: Sequelize.ENUM('To Do', 'Doing', 'Done'),
    defaultValue: 'To Do',
}


});
module.exports=Task
