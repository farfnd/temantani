class AdminRole {
    static get SUPER() {
        return 'ADMIN_SUPER';
    }

    static get LANDOWNER() {
        return 'ADMIN_LANDOWNER';
    }

    static get PROJECT() {
        return 'ADMIN_PROJECT';
    }

    static get WORKER() {
        return 'ADMIN_WORKER';
    }

    static get BUYER() {
        return 'ADMIN_BUYER';
    }
}

module.exports = AdminRole;
