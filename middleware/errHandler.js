const errHandler = (err, req, res, next) => {

    const statusCode = res.statusCode ? res.statusCode : 500;

    console.log('1');
    console.log(statusCode);
    switch (statusCode) {
        case 400:
            res.json({ msg1: "validation failed", msg2: err.message, msg3: err.stack })
            break;
        case 401:
            res.json({ msg1: "err", msg2: err.message, mssg3: err.stack })
            break;
        case 402:
            res.json({ msg1: "Un Authorized", msg2: err.message, mssg3: err.stack })
            break;
        case 403:
            res.json({ msg1: "Forbidden", msg2: err.message, mssg3: err.stack })
            break;
        case 404:
            res.json({ msg1: "Not found", msg2: err.message, msg3: err.stack })
            break;
        case 500:
            res.json({ msg1: "Server error", msg2: err.message, mssg3: err.stack })
            break;
        default:
            res.json({ msg: "shit happens" })
            break;
    }

}
module.exports = errHandler