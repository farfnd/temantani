const { Project } = require('../models');

module.exports = () => {
    const repository = {
        getAllProjects: (options = {}) => {
            return Project.findAll(options);
        },
        getProjectById: async (id, options = {}) => {
            console.log(id, options);
            const project = await Project.findByPk(id, options);
            if (!project) {
                throw new Error(`Project with id ${id} not found`);
            }
            return project;
        },
    };

    return repository;
};
