const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Role = sequelize.define('role',{
  id:{type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true ,
  allowNull:false,
  },
  name:{type:Sequelize.STRING}
})
module.exports=Role;
