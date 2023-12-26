const mongoose = require('mongoose'),
    UserModel = require('@XRKModels/user');
const models = {
    User: mongoose.model('User')
}
module.exports = models;

