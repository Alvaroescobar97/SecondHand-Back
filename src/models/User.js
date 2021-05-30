var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    email: String,
    password: String
});

UserSchema.statics.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

UserSchema.statics.comparePassword = async (password, confirmedPassword) =>{
    return await bcrypt.compare(password, confirmedPassword);
}

module.exports = mongoose.model('User', UserSchema);