const express = require('express');
const router = express.Router();
const checkToken = require('../middlewares/checkToken');

const {
    updateUserById,
    getUsersByName,
    getUserById,
    getUserPostsById
} = require('../controllers/usersController')


router.put('/users/:id', checkToken, updateUserById);
router.get('/users', checkToken, getUsersByName);
router.get('/users/:id', checkToken, getUserById);
router.get('/users/:id/posts', checkToken, getUserPostsById)

module.exports = router;