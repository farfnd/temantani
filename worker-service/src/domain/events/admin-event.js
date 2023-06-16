class AdminUpdated {
    constructor(type, user) {
        this.type = type
        this.userId = user.id;
        this.name = user.name;
        this.email = user.email;
        this.updatedAt = user.updatedAt;
    }
}

module.exports = AdminUpdated;
