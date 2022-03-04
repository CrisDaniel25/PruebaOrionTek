const express = require('express'),
router = express.Router(),
address = require('../controller/addresses.controller');

router.get('/', address.getAll);

router.get('/:id', address.getById);

router.post('/', address.create);

router.put('/:id', address.update);

router.delete('/:id', address.delete);

module.exports = router;