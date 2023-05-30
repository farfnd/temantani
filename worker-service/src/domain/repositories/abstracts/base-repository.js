class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    getAll(options = {}) {
        return this.model.findAll(options);
    }

    getById(id, options = {}) {
        return this.model.findByPk(id, options);
    }

    find(query, options = {}) {
        return this.model.findAll({ where: query, ...options });
    }

    create(data, options = {}) {
        return this.model.create(data, options);
    }

    update(id, data, options = {}) {
        return this.model.update(data, { where: { id }, ...options });
    }

    delete(id, options = {}) {
        return this.model.destroy({ where: { id }, ...options });
    }
}

module.exports = BaseRepository;
