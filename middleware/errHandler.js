const errHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const errorResponse = { message: err.message, stack: err.stack };

    switch (statusCode) {
        case 400:
            res.json({ ...errorResponse, errorType: "Validation Failed" });
            break;
        case 401:
            res.json({ ...errorResponse, errorType: "Unauthorized" });
            break;
        case 403:
            res.json({ ...errorResponse, errorType: "Forbidden" });
            break;
        case 404:
            res.json({ ...errorResponse, errorType: "Not Found" });
            break;
        case 500:
            res.json({ ...errorResponse, errorType: "Server Error" });
            break;
        default:
            res.json({ message: "Unexpected error occurred" });
            break;
    }
};

module.exports = errHandler;
