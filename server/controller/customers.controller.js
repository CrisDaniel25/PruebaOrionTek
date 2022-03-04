const service = require('../services/customers.services');

exports.getAll = async function(req, res) {
    try {

        const customers = await service._getAll(req.params.id); 
        return res.status(200).json(customers);

    } catch (error) {

        return res.status(500).json({ message: "", error: error });        
    
    }        
};

exports.getById = async function(req, res) {
    try {

        const customer = await service._getById(req.params.id);    
        return res.status(200).json(customer);
        
    } catch (error) {
        
        return res.status(500).json({ message: "", error: error });       

    }
};

exports.create = async function(req, res) {
    try {

        const customer = await service._create(req.body);
        return res.status(201).json(customer);
        
    } catch (error) {
        
        return res.status(500).json({ message: "", error: error });     

    }
};

exports.update = async function(req, res) {
    try {

        const customer = await service._update(req.params.id, req.body);
        return res.status(200).json(customer);
        
    } catch (error) {
        
        return res.status(500).json({ message: "", error: error });     

    }
}

exports.delete = async function(req, res) {
    try {

        const customer = await service._delete(req.params.id);
        return res.status(202).json(customer);
        
    } catch (error) {
        
        return res.status(500).json({ message: "", error: error });     

    }
}