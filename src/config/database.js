const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://pratiksabaleps_db_user:K53WWGeMAFTmmviP@cluster0.rlm6bjd.mongodb.net/');
}

module.exports = connectDB;