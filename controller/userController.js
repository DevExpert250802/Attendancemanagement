const expressAsyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// SignUp function: Registers a new user
const signUp = expressAsyncHandler(async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        res.status(400).json({ message: "Username and password must be entered" });
        return;
    }

    const alreadyUser = await userModel.findOne({ userName });

    if (alreadyUser) {
        res.status(400).json({ message: "Username already registered" });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const signingUp = await userModel.create({
        userName,
        password: hashedPassword
    });

    res.status(201).json(signingUp);
});

// SignIn function: User login and JWT generation
const signIn = expressAsyncHandler(async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Log input data
        console.log("SignIn Request Body:", req.body);

        if (!userName || !password) {
            res.status(400).json({ message: "Username and password must be entered" });
            return;
        }

        const foundUser = await userModel.findOne({ userName });

        // Log the found user for debugging
        console.log("Found User:", foundUser);

        if (!foundUser) {
            res.status(400).json({ message: "Username not matched" });
            return;
        }

        let passwordMatched = false;
        try {
            passwordMatched = await bcrypt.compare(password, foundUser.password);
        } catch (err) {
            console.error("Error comparing password:", err);
            return res.status(500).json({ message: "Error comparing passwords", error: err.message });
        }

        // Log password match result
        console.log("Password Matched:", passwordMatched);

        if (!passwordMatched) {
            res.status(400).json({ message: "Password not matched" });
            return;
        }

        // Ensure ATS is correctly loaded
        console.log("JWT Secret:", process.env.ATS);  // Log the secret for debugging

        const accessToken = jwt.sign(
            { un: foundUser.userName, id: foundUser._id },
            process.env.ATS,
            { expiresIn: '1h' } // Optional: token expiration time
        );

        // Log the generated token
        console.log("Generated Token:", accessToken);

        res.status(200).json({ id: foundUser._id, userName: foundUser.userName, accessToken });
    } catch (err) {
        console.error("SignIn Error:", err.stack); // Log the full stack trace

        res.status(500).json({
            message: "Unexpected error occurred",
            error: err.message, // Include the error message for better debugging
        });
    }
});


// Current function: Returns the current user's info (for logged-in users)
const current = expressAsyncHandler(async (req, res) => {
    res.status(200).json(req.user); // Send the current user info
});

module.exports = {
    signUp,
    signIn,
    current
};
