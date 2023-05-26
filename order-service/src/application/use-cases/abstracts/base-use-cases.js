class AbstractUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    getAll(options = {}) {
        return this.repository.getAll(options);
    }

    getById(id, options = {}) {
        return this.repository.getById({ where: { id }, ...options });
    }

    find(query, options = {}) {
        return this.repository.find({ where: query, ...options });
    }

    create(data, options = {}) {
        return this.repository.create(data, options);
    }

    update(id, data, options = {}) {
        return this.repository.update(data, { where: { id }, ...options });
    }

    delete(id, options = {}) {
        return this.repository.delete({ where: { id }, ...options });
    }
}

module.exports = AbstractUseCase;
