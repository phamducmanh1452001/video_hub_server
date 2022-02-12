const mongoose = require('mongoose');

const video = new mongoose.Schema({
    code: String,
    title: String,
    imageLink: String,
    actor: String,
    iconLink: String,
    file: String,
});

module.exports = mongoose.model('Video', video);