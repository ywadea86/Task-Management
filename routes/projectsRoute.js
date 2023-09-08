const express = require('express');

const projectController = require('../controllers/projectController');
const route = express.Router();

route.get("/:userid",projectController.getProjects);
route.post("/add-project",projectController.addProjects);
route.put("/:projectId",projectController.updateProject);
route.delete("/:projectId",projectController.deleteProject);
module.exports =route
