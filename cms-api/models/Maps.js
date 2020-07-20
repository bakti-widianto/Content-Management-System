var mongoose = require('mongoose');

var mapsSchema = new mongoose.Schema({
    title: String,
    lat: Number,
    lng: Number
});

module.exports = mongoose.model('Maps', mapsSchema);