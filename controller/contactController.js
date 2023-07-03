const asyncHandler = require('express-async-handler')
const contactSchema = require("../models/contactModel")

const getContacts = asyncHandler(async (req, res) => {
    console.log(req.user.un);
    const fetchedData = await contactSchema.find({belongsTo:req.user.id});

    res.status(200).json({ "length": fetchedData.length, "second": fetchedData })
})

const getSpecificContact = asyncHandler(async (req, res) => {
    const fetchSpecific = await contactSchema.findById(req.params.id)
    if (!fetchSpecific) {
        res.status(404)
        throw new Error("Contact Not found")
    }
    res.status(200).json(fetchSpecific)
})

const createContact = asyncHandler(async (req, res) => {


    const { name, number, belongsTo } = req.body
    console.log(name, number);
    if (!name || !number || !belongsTo) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const sendData = await contactSchema.create({
        name: name,
        number: number,
        belongsTo
    })
    // console.log(sendData);
    console.log(req.user);

    console.log(2);
    res.status(201).json(sendData)

})

const updateContact = asyncHandler(async (req, res) => {

    const checkData = await contactSchema.findById(req.params.id)
    if (!checkData) {
        res.status(404)
        throw new Error("Contact Not found for update")
    }
    const updatingData = await contactSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
    await res.status(200).json(updatingData)
}
)

const deleteContact = asyncHandler(async (req, res) => {

    const find = await contactSchema.findById(req.params.id)
    if (!find) {
        res.status(404)
        throw new Error("Contact not found for delete")
    }
    await find.deleteOne()
    res.status(200).json(find)
})


module.exports = {
    getContacts,
    getSpecificContact,
    createContact,
    updateContact,
    deleteContact
}
