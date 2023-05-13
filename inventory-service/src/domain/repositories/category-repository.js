import Category from '../models/Category.js';

export default () => {
    const repository = {
        getAllCategories: () => {
            return Category.findAll();
        },
        getCategoryById: (id) => {
            return Category.find({ id }).first();
        },
        createCategory: (body) => {
            return Category.create(body);
        },
        updateCategory: (id, body) => {
            return Category.update(id, body);
        },
        deleteCategory: (id) => {
            return Category.destroy(id);
        }
    };

    return repository;
};
