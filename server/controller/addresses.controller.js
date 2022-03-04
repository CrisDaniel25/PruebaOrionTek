const service = require('../services/addresses.services');

exports.getAll = async function(req, res) {
    try {

        const addresses = await service._getAll(); 
        return res.status(200).json(addresses);

    } catch (error) {

        return res.status(500).json({ message: "", error: error });        
    
    }        
};

exports.getById = async function(req, res) {
    try {

        const address = await service._getById(req.params.id);    
        return res.status(200).json(address);
        
    } catch (error) {
        
        return res.status(500).json({ message: "", error: error });       

    }
};

exports.create = async function(req, res) {
    try {

        const address = await service._create(req.body);
        return res.status(201).json(address);
        
    } catch (error) {
        
        return res.status(500).json({ message: "", error: error });     

    }
};

exports.update = async function(req, res) {
    try {

        const address = await service._update(req.params.id, req.body);
        return res.status(200).json(address);
        
    } catch (error) {
        
        return res.status(500).json({ message: "", error: error });     

    }
}

exports.delete = async function(req, res) {
    try {

        const address = await service._delete(req.params.id);
        return res.status(202).json(address);
        
    } catch (error) {
        
        return res.status(500).json({ message: "", error: error });     

    }
}