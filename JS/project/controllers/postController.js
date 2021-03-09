const {Post} = require('../models');
const postService = require('../service/postService');
const path = require('path');
const fs = require('fs').promises;

const getPublicPosts = async (req, res) => {
    try {
        const offset = +req.query.offset || 0;
        const limit = +req.query.limit || 0;

        const posts = await Post.find({}, {__v: 0, _id: 0, userId: 0}).skip(offset).limit(limit);
        if (!posts) {
            return res.status(400).json({
                message: "Cannot find a post"
            })
        }
        return res.status(200).json({
            posts
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const getPosts = async (req, res) => {
    try {
        const userId = req.user.id;
        const offset = +req.query.offset || 0;
        const limit = +req.query.limit || 0;
        const posts = await Post.find({userId: userId}, {__v: 0, _id: 0, userId: 0}).skip(offset).limit(limit);
        if (!posts) {
            return res.status(400).json({
                message: "Cannot find posts"
            })
        }
        return res.status(200).json({
            posts
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const createPost = async (req, res) => {
    try {

        const userId = req.user.id;
        const images = req.files;

        const {title, text, description} = req.body;
        if (!title || !text || !description) {
            return res.status(403).json({
                error: 'Fill in all fields'
            });
        }

        const newPost = new Post({
            userId,
            title,
            text,
            description,
            images: images.map(i => '/uploads/images/' + i.filename)
        });

        await newPost.save();
        return res.status(201).json({
            message: 'You successfully create a post'
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}
const updatePost = async (req, res) => {
    try {
        const {title, text, description} = req.body;
        const userId = req.user.id;
        const images = req.files;
        const postId = req.params.id;

        const foundedPost = await Post.findOne({_id: postId});
        if (userId !== foundedPost.userId) {
            return res.status(403).json({
                message: "You cannot update other user's post "
            })
        }
        const post = {title, text, description, images};
        const isUpdated = await postService.updatePostByIdAndSave(postId, post);

        if (isUpdated) {
            return res.status(200).json({
                message: 'Post successfully updated'
            });
        }

        return res.status(400).json({
            message: "Invalid id"
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}
const getTopPosts = async (req, res) => {
    try {
        const offset = +req.query.offset || 0;
        const limit = +req.query.limit || 0;

        const posts = await Post.find({}, {__v: 0, _id: 0, userId: 0}).skip(offset).limit(limit);
        if (!posts) {
            return res.status(400).json({
                message: "Cannot find a post"
            })
        }
        return res.status(200).json({
            posts
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}
const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findOne({_id: postId}, {__v: 0, _id: 0, userId: 0});
        if (!post) {
            return res.status(400).json({
                message: "Post not found"
            })
        }
        return res.status(200).json({
            post
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const getPostsByDescription = async (req, res, next) => {
    try {
        const description = req.query.description;
        const offset = +req.query.offset || 0;
        const limit = +req.query.limit || 0;

        if (!description) {
            return next()
        }
        const posts = await Post.find({$text: {$search: description}}, {
            __v: 0,
            _id: 0,
            userId: 0
        }).skip(offset).limit(limit).sort({createdDate: -1});

        if (!posts) {
            return res.status(400).json({
                message: "Post not found"
            })
        }

        return res.status(200).json({posts})

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}
const deletePostById = async (req, res) => {
    try {
        const userId = req.user.id;
        const postId = req.params.id;
        const post = await Post.findOne({_id: postId});
        if (!post) {
            return res.status(400).json({
                message: "Post not found"
            })
        }
        if (userId !== post.userId) {
            return res.status(403).json({
                message: "You cannot delete other user's post "
            })
        }

        for (const image of post.images) {
            await fs.unlink(path.resolve(image.substring(1)));
        }
        await Post.deleteOne({_id: postId});
        res.status(200).json({
            message: "You have deleted your post successfully"
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}
module.exports = {
    createPost,
    getPublicPosts,
    getPosts,
    getTopPosts,
    getPostById,
    getPostsByDescription,
    deletePostById,
    updatePost
}