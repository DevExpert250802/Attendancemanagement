const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    belongsTo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "userCredentials"
    },
    name: {
        type: String,
        required: [true, "Please add the contact "],
    },
    number: {
        type:String,
        required: [true, "Plase add the contact"]

    }
}, 
{
    timestamps: true

})

module.exports = mongoose.model("userContacts", contactSchema);