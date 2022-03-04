const db = require('../config/db.config');

async function _getAll() {
    const allAddress = await db.addresses.findAll();
    
    return allAddress;
}

async function _getById(id) {
    const Address = await db.addresses.findByPk(id);

    return Address;
}

async function _create(address) {    
    const createAddress = await db.addresses.create({
        country: address.country,
        city: address.city,
        street: address.street,
        building: address.building,
        customerId: address.customerId,
        zip: address.zip
    });

    return createAddress; 
}

async function _update(id, address) {
    const updateAddress =  await db.addresses.update({
        country: address.country,
        city: address.city,
        street: address.street,
        building: address.building,
        customerId: address.customerId,
        zip: address.zip
    },
    {
        where: {
            addressId: id
        }
    });

    return updateAddress;
}

async function _delete(id) {
    const deleteAddress = await db.addresses.destroy({
        where: {
            addressId: id
        }
    });
    
    return deleteAddress;
}

module.exports = {
    _getAll,
    _getById,
    _create,
    _update,
    _delete
}