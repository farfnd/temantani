class UserRegistered {
    constructor(type, user) {
        this.type = type
        this.userId = user.id;
        this.name = user.name;
        this.email = user.email;
        this.phoneNumber = user.phoneNumber;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.roles = (user.roles.map(role => role.name)).join();
    }
}

module.exports = UserRegistered;
