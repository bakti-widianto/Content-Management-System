var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String }
});


module.exports = mongoose.model('Users', userSchema);