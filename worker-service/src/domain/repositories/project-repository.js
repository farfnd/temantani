const { Project } = require('../models/index.js');

module.exports = () => {
    const repository = {
        getAllProjects: () => {
            return Project.findAll();
        },
        getProjectById: (id) => {
            return Project.findOne({ where: { id } });
        },
        createProject: (body) => {
            return Project.create(body);
        },
        updateProject: (id, body) => {
            return Project.update(body, { where: { id } });
        },
        deleteProject: async (id) => {
            return Project.destroy({ where: { id } });
        },
    };

    return repository;
};
