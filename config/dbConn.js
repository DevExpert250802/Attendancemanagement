const mongoose = require('mongoose');
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING, { socketTimeoutMS: 20000 });
        console.log("Database connected successfully:", connect.connection.host);
    } catch (err) {
        console.log("Database connection error:", err);
        process.exit(1);
    }
};
module.exports = connectDb;
