const express = require('express');
const taskController = require('../controllers/taskController');
const route = express.Router();
const upload= require('../middleware/multer');

route.get("/:projectId",taskController.getTasksForProject);
route.get("/",taskController.getTasksForUser);
route.post("/add-task/:projectId",upload.single('media'),taskController.addTask);
route.put("/:taskId",upload.single('media'),taskController.updateTask);
route.put("/status/:taskId",taskController.updateStatusTask);
route.delete("/:taskId",taskController.deleteTask);
module.exports =route
