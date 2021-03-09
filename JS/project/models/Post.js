const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: Array,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

PostSchema.index({userId: 1});
PostSchema.index({description: 'text'});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;