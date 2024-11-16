const jwt = require("jsonwebtoken")

const expressAsyncHandler = require("express-async-handler")

const validatingToken = expressAsyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        console.log(2);
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ATS, (err, decoded) => {
            if (err) {
                res.status(401)
                throw new Error("User is not Authorized")
            }
            req.user = decoded;
            next();
        })
    }

    if (!token) {
        res.status(401)
        throw new Error("User is not authorized or not signed In")
    }

}
)

module.exports = validatingToken;