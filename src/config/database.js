const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://pratiksabaleps_db_user:qyxYjEZAJ2QYGiG7@cluster0.9rnlm9s.mongodb.net/?appName=Cluster0');
}

module.exports = connectDB;