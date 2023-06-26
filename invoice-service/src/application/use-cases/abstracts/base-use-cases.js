class AbstractUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    getAll(options = {}) {
        return this.repository.getAll(options);
    }

    getById(id, options = {}) {
        return this.repository.getById(id, options);
    }

    find(query, options = {}) {
        return this.repository.find(query, options);
    }
    
    findOne(query, options = {}) {
        return this.repository.findOne(query, options);
    }

    create(data, options = {}) {
        return this.repository.create(data, options);
    }

    update(id, data, options = {}) {
        return this.repository.update(id, data, options);
    }

    delete(id, options = {}) {
        return this.repository.delete(id, options);
    }
}

module.exports = AbstractUseCase;
