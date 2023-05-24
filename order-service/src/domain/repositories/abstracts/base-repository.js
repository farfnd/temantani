class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    getAll() {
        return this.model.findAll();
    }

    getById(id) {
        return this.model.findOne({ where: { id } });
    }

    find(query) {
        return this.model.findAll({ where: query });
    }

    create(data) {
        return this.model.create(data);
    }

    update(id, data) {
        return this.model.update(data, { where: { id } });
    }

    delete(id) {
        return this.model.destroy({ where: { id } });
    }
}

module.exports = BaseRepository;
