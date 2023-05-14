class UserRegistered {
    constructor(user) {
        this.userId = user.userId;
        this.name = user.name;
        this.email = user.email;
        this.roles = user.roles;
    }
}

module.exports = UserRegistered;
