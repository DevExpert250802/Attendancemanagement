const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "username is missing"]
    },
    password: {
        type: String,
        required: [true, "password is required duffer"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('userCredentials', userSchema)