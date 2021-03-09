const authService = require("../service/authService");
const userService = require('../service/userService')
const {User, Post} = require('../models');

const updateUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const {firstName, lastName, age, email, password} = req.body;
        const user = {
            firstName: firstName || null,
            lastName: lastName || null,
            age: age || null,
            email: email || null,
            password: password || null,
        }

        const message = authService.validate(user);

        if (message) {
            return res.status(400).json({
                message: message
            });
        }
        const isUpdated = await userService.updateAndSaveUser(userId, user)
        if (!isUpdated) {
            return res.status(400).json({
                message: "Invalid id"
            })
        }

        return res.status(200).json({
            message: "You have updated your info"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal server error'
        })
    }


}

const getUsersByName = async (req, res) => {
    try {
        const {query} = req;
        if (!query.name) {
            return res.status(400).json({
                message: "Please give query for searching"
            })
        }
        const users = await User.find({firstName: query.name}, {_id: 0, password: 0, __v: 0})
        if (!users) {
            res.status(404).json({
                message: 'Cannot find an user'
            })
        }
        return res.status(200).json({
            users
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({_id: userId}, {_id: 0, password: 0, __v: 0});
        if (!user) {
            return res.status(400).json({
                message: "Cannot find a user with given id"
            })
        }
        return res.status(200).json({
            user
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const getUserPostsById = async (req, res) => {
    try {
        const userId = req.params.id;
        const offset = req.query.offset || 0;
        const limit = req.query.limit || 0;

        const posts = await Post.find({userId: userId}, {
            userId: 0,
            _id: 0,
            __v: 0
        }).skip(offset).limit(limit).sort({createdAt: -1});
        if (!posts) {
            return res.status(400).json({
                message: "Cannot find a post"
            })
        }
        return res.status(200).json({
            posts
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

module.exports = {
    updateUserById,
    getUsersByName,
    getUserById,
    getUserPostsById
}
