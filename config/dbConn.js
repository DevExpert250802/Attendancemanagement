const mongoose = require('mongoose')

const connectDb = async () => {

    try {
        const connect = await mongoose.connect(process.env.CONNSTR, { socketTimeoutMS: 20000 })
        console.log("connected successfully: ",
            connect.connection.host,
            connect.connection.name
        );



    }
    catch (err) {
        console.log(err);
        process.exit(1)
    }
}

module.exports = connectDb;