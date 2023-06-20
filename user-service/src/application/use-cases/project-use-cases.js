module.exports = (repository) => {
    const useCases = {
        getAllProjects: (options = {}) => {
            return repository.getAllProjects(options);
        },
        getProjectById: (id, options = {}) => {
            return repository.getProjectById(id, options);
        },
    };

    return useCases;
};
