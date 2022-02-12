const mongoose = require('mongoose');

const fux = new mongoose.Schema({
    code: String,
    title: String,
    imageLink: String,
    iconLink: String,
    file: String,
});

module.exports = mongoose.model('Fux', fux);