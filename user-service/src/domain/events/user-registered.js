class UserRegistered {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.phone = user.phone;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.roles = user.roles.map(role => role.name);
    }
}

module.exports = UserRegistered;
