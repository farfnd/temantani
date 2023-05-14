module.exports = (repository) => {
    const useCases = {
        register: (body) => {
            return repository.register(body);
        },
        login: (email, password) => {
            return repository.login(email, password);
        },
    };

    return useCases;
};
