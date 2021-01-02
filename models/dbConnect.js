const mongoose = require('mongoose');

const DB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to DB successfully!");
    } catch (err) {
        console.log("Connection Error while connecting to DB!!!", err);
    }
}

module.exports = DB;