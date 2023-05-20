module.exports = (repository) => {
    const useCases = {
        getAllProjects: () => {
            return repository.getAllProjects();
        },
        getProjectById: (id) => {
            return repository.getProjectById(id);
        },
        createProject: (body) => {
            return repository.createProject(body);
        },
        updateProject: (id, body) => {
            return repository.updateProject(id, body);
        },
        deleteProject: (id) => {
            return repository.deleteProject(id);
        },
        createProjectFromMessage: async (message) => {
            try {
                const project = JSON.parse(message.value.toString());
                const { id, landId, status, workerNeeds, description } = project; // Extract only the relevant fields
                return repository.createProject({ id, landId, status, workerNeeds, description });
            } catch (error) {
                console.error('Error creating project from message:', error);
                throw error;
            }
        },
    };

    return useCases;
};
