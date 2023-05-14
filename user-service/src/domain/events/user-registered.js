class UserRegistered {
    constructor(user) {
        this.userId = user.id;
        this.name = user.name;
        this.email = user.email;
        this.roles = user.roles;
    }
}

module.exports = UserRegistered;
