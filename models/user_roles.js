const Sequelize = require('sequelize');
const sequelize = require('../util/database');
UserRole = sequelize.define('user-roles',{
  id:{type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true ,
  allowNull:false,
  },
})
module.exports=UserRole;
