export default (repository) => {
    const useCases = {
        getAllCategories: () => {
            return repository.getAllCategories()
        },
        getCategoryById: (id) => {
            return repository.getCategoryById(id)
        },
        createCategory: (body) => {
            return repository.createCategory(body)
        },
        updateCategory: (id, body) => {
            return repository.updateCategory(id, body)
        },
        deleteCategory: (id) => {
            return repository.deleteCategory(id)
        },
    };

    return useCases;
}