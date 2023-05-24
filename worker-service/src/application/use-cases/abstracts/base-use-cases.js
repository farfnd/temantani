class AbstractUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    getAll() {
        return this.repository.getAll();
    }

    getById(id) {
        return this.repository.getById(id);
    }

    find(query) {
        return this.repository.find(query);
    }

    create(data) {
        return this.repository.create(data);
    }

    update(id, data) {
        return this.repository.update(id, data);
    }

    delete(id) {
        return this.repository.delete(id);
    }
}

module.exports = AbstractUseCase;
