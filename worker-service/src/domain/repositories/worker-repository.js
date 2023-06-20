const UserEvent = require('../events/user-event');
const { Worker } = require('../models');
const BaseRepository = require('./abstracts/base-repository');
const UserEventType = require('../enums/UserEventType');

class WorkerRepository extends BaseRepository {
    constructor(eventPublisher) {
        super(Worker);
        this.eventPublisher = eventPublisher;
    } 
    
    async update(id, data, options = {}) {
        await super.update(id, data, options);
        const updatedUser = await this.getById(id);
        console.log(data);
        if (data.skills) {
            await updatedUser.setSkills(data.skills);
        }
    }
}

module.exports = WorkerRepository;
