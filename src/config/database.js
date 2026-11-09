const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://pratiksabaleps_db_user:KMJ44XxZZLuHkcdP@cluster0.jqh2ske.mongodb.net/');
}

module.exports = connectDB;