var mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
    letter: String,
    frequency: Number
});

module.exports = mongoose.model('Data', dataSchema);