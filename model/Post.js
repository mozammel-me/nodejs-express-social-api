let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postSchema = new Schema({
    title: {
        type: String, minlength: 5, required: true
    },
    details: {
        type: String,
    },
    user: {
        user_id: String,
        user_name: String
    },
    like: [
        {
            user_id: String,
            user_name: String
        }
    ],
    comments: [
        {
            user_id: String,
            user_name: String,
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);