const Task =require('../models/task');
const Project = require('../models/project');
//id-Project
const getTasksForProject=(req,res,next)=>{
    const projectId=req.params.projectId
    Task.findAll({where:{
        projectId:projectId
    }}).then(tasks=>{
res.status(200).json({tasks:tasks})
    }).catch(err=>{
        res.status(500).json({error:err.message})
    })
};
//id-User
const getTasksForUser=(req,res,next)=>{
    Task.findAll({where:{
        userId:req.userId
    }}).then(tasks=>{
res.status(200).json({tasks:tasks})
    }).catch(err=>{
        res.status(500).json({error:err.message})
    })
};

const postAddTaskForProject=()=>{
const project = Project.findByPk({id:req.params.projectId});
if(project){
    Task.create({
        title:req.body.title,
        media:req.file.filename,
        description:req.body.description,
        status:req.body.staus,
        userId:req.userId,
        projectId:req.params.projectId
    }).then(result=>{
        res.status(201).json({message:"The Task has been created Successfully"})
    }).catch(err=>{
        res.status(500).json({message:`Therer is an Error: ${err}`})

    })
}else{
    res.json({message:"this product not found"})
}

};
///tasks/:taskId
const putTaskOnProject=(req,res,next)=>{
    const taskId = req.params.taskId
Task.findByPk(taskId).then(task=>{
    if (!task) return res.status(404).json({ error: 'Task not found' });
    task.update(req.body);
    res.json(task);
}).catch(err=>{
    res.status(500).json({ error: err.message });
})
};
const updateStatus =(req,res,next)=>{
    const taskId = req.params.taskId
    Task.findByPk(taskId).then(task=>{
        if (!task) return res.status(404).json({ error: 'Task not found' });
        task.update({status:req.body.status});
        res.json(task);
    }).catch(err=>{
        res.status(500).json({ error: err.message });
    })
}
const deleteTaskProject=()=>{
    const taskId = req.params.taskId
    Project.findByPk(taskId).then(task=>{
        if (!task) return res.status(404).json({ error: 'Project not found' });
        task.destroy();
        res.json({ message: 'Task deleted successfully' });
    }).catch(err=>{
        res.status(500).json({ error: err.message });
    })
};
const taskController={
    getTasksForProject:getTasksForProject,
    getTasksForUser:getTasksForUser,
    addTask:postAddTaskForProject,
    updateTask:putTaskOnProject,
    updateStatusTask:updateStatus,
    deleteTask:deleteTaskProject
};
module.exports=taskController;
