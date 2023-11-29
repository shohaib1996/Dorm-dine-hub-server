const { Schema, default: mongoose } = require("mongoose");


const AboutSchema = new Schema({
    hobby: {
        type: String,
        required: true,
    },
    pet: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
    post: {
        type: String,
        required: true,
    },
    email: {
        type: String
    }

})

const About = mongoose.model("About", AboutSchema)
module.exports = About

