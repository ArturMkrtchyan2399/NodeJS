const express = require('express');
const router = express.Router();

const users = require('../controllers/userController');

router.post('/', users.createUser);
router.get('/', users.getUsers);
router.get('/:id', users.getById);
router.delete('/:id', users.deleteUserById);
router.put('/:id', users.updateUserById);


module.exports = router;