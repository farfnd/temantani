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

        if (this.eventPublisher) {
            const userEvent = new UserEvent(UserEventType.PROFILE_UPDATED, updatedUser);
            this.eventPublisher.publish(userEvent);
        }
    }
}

module.exports = WorkerRepository;
