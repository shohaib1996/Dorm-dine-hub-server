const { Schema, default: mongoose} = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    badge: {
        type: String,
        required: true,
    },
    badge_image: {
        type: String,
        required: true
    },
    role: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

