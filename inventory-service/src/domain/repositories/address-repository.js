import Address from '../models/Address.js';

export default () => {
    const repository = {
        getAllAddresses: () => {
            return Address.findAll();
        },
        getAddress: filters => {
            return Address.find(filters);
        },
        getAddressById: (id) => {
            return Address.find({ id }).first();
        },
        createAddress: (body) => {
            return Address.create(body);
        },
        updateAddress: (id, body) => {
            return Address.update(id, body);
        },
        deleteAddress: (id) => {
            return Address.destroy(id);
        }
    };

    return repository;
};
