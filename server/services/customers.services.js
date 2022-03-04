const { addresses } = require('../config/db.config');
const db = require('../config/db.config');

async function _getAll(id) {
    const allCustomers = await db.customers.findAll({
        include: [{
            model: addresses
        }]        
    });
    
    return allCustomers;
}

async function _getById(id) {
    const Customer = await db.customers.findByPk(id, {
        include: [{
            model: addresses
        }]        
    });

    return Customer;
}

async function _create(customer) {    
    const createCustomer = await db.customers.create({
        firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
        phonenumber: customer.phonenumber,
        gender: customer.gender
    });

    return createCustomer; 
}

async function _update(id, customer) {
    const updateCustomer =  await db.customers.update({
        firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
        phonenumber: customer.phonenumber,
        gender: customer.gender
    },
    {
        where: {
            customerId: id
        }
    });

    return updateCustomer;
}

async function _delete(id) {
    const deleteCustomer = await db.customers.destroy({
        where: {
            customerId: id
        }
    });
    
    return deleteCustomer;
}

module.exports = {
    _getAll,
    _getById,
    _create,
    _update,
    _delete
}