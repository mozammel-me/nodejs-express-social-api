let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    avatar: {
        type: String, required: true
    },
    date: {
        type: Date, default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);