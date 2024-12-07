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
        const { title, description, status } = req.body;  // Extract fields from the request body
        const { id: projectId } = req.params;  // Extract projectId from the URL params

        // Find the project by ID and update the fields
        const result = await Project.findByIdAndUpdate(
            projectId,
            { title, description, status },  // Update fields
            { new: true }  // Return the updated project
        );

        if (!result) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json(result);  // Send the updated project as the response
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating project", error: err });
    }
};



const getAllProjects = async (req, res) => {
    try {
        // Fetch all projects from the database
        let projects = await Project.find(); 
        
        // Check if any projects are found
        if (projects.length > 0) {
            // Remove password field from each project
            let modifiedProjects = projects.map((project) => {
                return { ...project._doc };
            });
            // Send the modified list of projects
            res.send(modifiedProjects);
        } else {
            // No projects found
            res.send({ message: "No project found" });
        }
    } catch (err) {
        // Handle errors
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

  // Update Project Status Controller
const updateProjectStatus = async (req, res) => {
    try {
        const { status } = req.body;  // Extract the status from the request body
        const { id: projectId } = req.params;  // Extract projectId from the URL params

        // Find the project by ID and update its status
        const result = await Project.findByIdAndUpdate(
            projectId,
            { status },  // Update only the status field
            { new: true }  // Return the updated project
        );

        if (!result) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json(result);  // Send the updated project as the response
    } catch (err) {
        console.error(err);  // Log any errors
        res.status(500).json({ message: "Error updating project status", error: err });
    }
};





const deleteProject = async (req, res) => {
    try {
        const { id: projectId } = req.params;  // Extract projectId from the URL params

        // Find the project by ID and delete it
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
      const totalProjects = await Project.countDocuments(); // Count all project documents
      res.status(200).json({ totalProjects }); // Respond with the count
    } catch (error) {
      next(error); // Pass any error to the error handler middleware
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