class UserRegistered {
    constructor(type, user) {
        this.type = type
        this.userId = user.id;
        this.name = user.name;
        this.email = user.email;
        this.phoneNumber = user.phoneNumber;
        this.street = user.street;
        this.city = user.city;
        this.postalCode = user.postalCode;
        this.profilePictureUrl = user.profilePictureUrl;
        this.bank = user.bank;
        this.bankAccountNumber = user.bankAccountNumber;
        this.bankAccountHolderName = user.bankAccountHolderName;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.roles = (user.roles.map(role => role.name)).join();
    }
}

module.exports = UserRegistered;
