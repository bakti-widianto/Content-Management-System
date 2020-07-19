var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String }
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, saltRounds, (err, hash) => {
        if (err)
            console.log(err);
        else {
            this.password = hash;
            // this.token = this.getToken();
            next();
        }
    })
});


module.exports = mongoose.model('Users', userSchema);