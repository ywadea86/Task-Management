
const express = require('express');
const cors = require('cors');
const cookieSession = require("cookie-session");
const sequelize = require('./util/database')
const User = require('./models/user');
const Role = require('./models/role');
const UserRole=require('./models/user_roles');
const Project=require('./models/project');
const Task=require('./models/task')
const app = express();
const bodyParser = require('body-parser');
const authJwt=require('./middleware/authJwt')
require('dotenv').config();

//----------------------------------------------------------------------//



app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true,}));
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());
User.belongsToMany(Role,{through:UserRole});
User.hasMany(Project);
Project.belongsTo(User,{
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Project.hasMany(Task);
Task.belongsTo(User);
Role.belongsToMany(User,{through:UserRole});
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
  Role.create({
    id: 2,
    name: "moderator"
  });
  Role.create({
    id: 3,
    name: "admin"
  });
}
app.use(
    cookieSession({
      name: "todo-session",
      keys: ["Session_secure"],
      httpOnly: true,
    })
  );
  const auth = require('./routes/authRoute');
  const projects= require('./routes/projectsRoute');
  const tasks =require('./routes/tasksRoute');
  app.use("/api/auth",auth);
  app.use("/api/projects",authJwt,projects);
  app.use("/api/tasks",authJwt,tasks);
  app.use('/uploads', express.static('uploads'));
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to todo System." });
  });
  const PORT = process.env.PORT || 8080;
sequelize.sync({force:false}).then(result=>{
  //initial();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
  console.log(result)}).catch(err=>
    console.log(err)
  )
