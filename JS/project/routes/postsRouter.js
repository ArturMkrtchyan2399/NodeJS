const express = require('express');
const router = express.Router();
const checkToken = require('../middlewares/checkToken');
const upload = require('../middlewares/imageUploader')

const {
    createPost,
    getPublicPosts,
    getPosts,
    getTopPosts,
    getPostById,
    getPostsByDescription,
    updatePost,
    deletePostById
} = require('../controllers/postController')

router.get('/', getPublicPosts)

router.post('/posts', [checkToken,upload.array('images',5)], createPost);
router.put('/posts/:id',[checkToken,upload.array('images',5)],updatePost);
router.get('/posts', checkToken, getPostsByDescription);
router.get('/posts', checkToken, getPosts);
router.get('/posts/top', checkToken, getTopPosts);
router.get('/posts/:id', checkToken, getPostById);
router.delete('/posts/:id', checkToken, deletePostById);

module.exports = router;