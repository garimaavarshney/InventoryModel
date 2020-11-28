const express = require('express');
const router = express.Router();
const itemController = require('./item.controller');

router.post('/create', itemController.create);
router.put('/edit', itemController.update);
router.delete('/delete', itemController.delete);

module.exports = router;
