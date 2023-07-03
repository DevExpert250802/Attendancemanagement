const expressAsyncHandler = require('express-async-handler')
const userModel = require('../models/userModel')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const signUp = expressAsyncHandler(async (req, res) => {

    const { userName, password } = req.body;

    if (!userName || !password) {
        res.status(400)
        throw new Error("Username and password must be entered")
    }

    const alreadyUser = await userModel.findOne({ userName })

    console.log(alreadyUser, userName);
    if (alreadyUser) {
        res.status(400)
        throw new Error("Username already registered")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);
    const signingUp = await userModel.create({
        userName,
        password: hashedPassword
    })


    res.status(200).json(signingUp)
}
)

const signIn = expressAsyncHandler(async (req, res) => {
    const { userName, password } = req.body;

    const foundUser = await userModel.findOne({ userName })

    if (!foundUser) {
        res.status(400)
        throw new Error("Username not matched")
    }

    const passwordMatched = await bcrypt.compare(password, foundUser.password)
    if (!passwordMatched) {
        res.status(400)
        throw new Error("password not matched")
    }

    const accessToken = jwt.sign(
        { un: foundUser.userName, id: foundUser._id },
        process.env.ATS
    )

    res.status(200).json({ id: foundUser._id, userName: foundUser.userName, accessToken })

})

const current = expressAsyncHandler(async (req, res) => {
    res.status(201).json(req.user)
}
)

module.exports = {
    signUp, signIn, current
}