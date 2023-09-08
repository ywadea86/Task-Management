
const Project =require('../models/project');

const getUserProject=(req,res,next)=>{
    Project.findAll({where:{
        userId:req.userId
    }}).then(projects=>{
res.status(200).json({projects:projects})
    }).catch(err=>{
        res.status(500).json({error:err.message})
    })
};
const postAddProject=(req,res,next)=>{
    Project.create({
        name:req.body.name,
        description:req.body.description,
        userId:req.userId
    }).then(result=>{
        res.status(201).json({message:"The Product has been created Successfully"})
    }).catch(err=>{
        res.status(500).json({message:`Therer is an Error: ${err}`})

    })
};
///projects/:projectId
const putUserProject=(req,res,next)=>{
const projectId = req.params.projectId
Project.findByPk(projectId).then(project=>{
    if (!project) return res.status(404).json({ error: 'Project not found' });
    project.update(req.body);
    res.json(project);
}).catch(err=>{
    res.status(500).json({ error: err.message });
})
};
////projects/:projectId
const deleteProject=()=>{
    const projectId = req.params.projectId
    Project.findByPk(projectId).then(project=>{
        if (!project) return res.status(404).json({ error: 'Project not found' });
        project.destroy();
        res.json({ message: 'Project deleted successfully' });
    }).catch(err=>{
        res.status(500).json({ error: err.message });
    })
};
const projectController={
    getProjects:getUserProject,
    addProjects:postAddProject,
    updateProject:putUserProject,
    deleteProject:deleteProject
};
module.exports=projectController;
