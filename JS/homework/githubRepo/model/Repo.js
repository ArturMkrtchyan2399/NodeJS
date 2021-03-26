const mongoose = require('mongoose');

const ReposSchema = new mongoose.Schema({
    id:Number,
    name:String,
    html_url:String,
    description:String,
    forks:Number,
    open_issues:Number,
    language:String,
    size:Number,
    watchers:Number,
    default_branch:String,
})

const Repos = mongoose.model('Repos', ReposSchema);

module.exports = Repos;