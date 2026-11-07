const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://pratiksabaleps_db_user:Ugd5G51Y5XFH4qLA@cluster0.cwgbctn.mongodb.net/');
}

module.exports = connectDB;