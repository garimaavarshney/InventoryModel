const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.post('/create', userController.create);
router.put('/edit', userController.update);
router.delete('/delete', userController.delete);

module.exports = router;
