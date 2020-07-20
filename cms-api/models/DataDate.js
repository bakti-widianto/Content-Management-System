var mongoose = require('mongoose');

var dataDateSchema = new mongoose.Schema({
    letter: String,
    frequency: Number
});

module.exports = mongoose.model('DataDate', dataDateSchema);