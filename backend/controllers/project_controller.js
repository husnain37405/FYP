import Project from "../models/projectSchema.js"

const addProject = async (req, res) => {
    try {
        const project = new Project({
            ...req.body,
        });

        let result = await project.save();
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding project", error: err });
    }
};

const updateProject = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const { id: projectId } = req.params;


        const result = await Project.findByIdAndUpdate(
            projectId,
            { title, description, status },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating project", error: err });
    }
};



const getAllProjects = async (req, res) => {
    try {
        let projects = await Project.find();

        if (projects.length > 0) {
            let modifiedProjects = projects.map((project) => {
                return { ...project._doc };
            });
            res.send(modifiedProjects);
        } else {
            res.send({ message: "No project found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getStatusOptions = (req, res) => {
    try {
        const statuses = Project.schema.path('status').enumValues;
        res.status(200).json({ statuses });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch statuses', error });
    }
};

const updateProjectStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id: projectId } = req.params;

        const result = await Project.findByIdAndUpdate(
            projectId,
            { status },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating project status", error: err });
    }
};





const deleteProject = async (req, res) => {
    try {
        const { id: projectId } = req.params;

        const result = await Project.findByIdAndDelete(projectId);

        if (!result) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json({ message: "Project deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting project", error: err });
    }
};

const getProjectsStats = async (req, res, next) => {
    try {
        const totalProjects = await Project.countDocuments();
        res.status(200).json({ totalProjects });
    } catch (error) {
        next(error);
    }
};

const DefaultProjects = async () => {
    const defaultProjects = [
        { title: 'General', description: 'General donations', status: 'Active', isDefault: true },
        { title: 'Zakat', description: 'Zakat donations', status: 'Active', isDefault: true },
        { title: 'Sadqa', description: 'Sadqa donations', status: 'Active', isDefault: true },
    ];

    for (const project of defaultProjects) {
        const exists = await Project.findOne({ title: project.title, isDefault: true });
        if (!exists) {
            await Project.create(project);
        }
    }
};

export {
    addProject,
    updateProject,
    getAllProjects,
    getStatusOptions,
    updateProjectStatus,
    deleteProject,
    getProjectsStats,
    DefaultProjects
};