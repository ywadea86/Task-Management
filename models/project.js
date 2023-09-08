const Sequelize =require('sequelize');
const sequelize = require('../util/database');
const Project = sequelize.define('project',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name:{type:Sequelize.STRING,allowNull:false},
    description:Sequelize.TEXT

});
module.exports=Project
