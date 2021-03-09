const {Post} = require('../models');
const fs = require('fs').promises;
const path = require('path');

const updatePostByIdAndSave = async (postId, post) => {
    let {title, text, description, images} = post;
    images = images.map(i => '/uploads/images/' + i.filename);
    const foundedPost = await Post.findById(postId);
    if (!foundedPost) {
        return false;
    }
    if (text) {
        foundedPost.text = text;
    }
    if (title) {
        foundedPost.title = title;
    }
    if (description) {
        foundedPost.description = description;
    }
    if (images.length !== 0) {
        for (const image of foundedPost.images) {
            await fs.unlink(path.resolve(image.substring(1)));
        }
        foundedPost.images = images;
    }
    await foundedPost.save();
    return true;
}

module.exports = {
    updatePostByIdAndSave
}