const { Admin } = require('../models');
const BaseRepository = require('./abstracts/base-repository');
const AdminEvent = require('../events/admin-event');
const UserEventType = require('../enums/UserEventType');

class AdminRepository extends BaseRepository {
    constructor(eventPublisher) {
        super(Admin);
        this.eventPublisher = eventPublisher;
    }
    
    async update(id, data, options = {}) {
        await super.update(id, data, options);
        const updatedAdmin = await this.getById(id);

        if (this.eventPublisher) {
            const adminEvent = new AdminEvent(UserEventType.PROFILE_UPDATED, updatedAdmin);
            this.eventPublisher.publish(adminEvent);
        }
    }
}

module.exports = AdminRepository;
