const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://pratiksabaleps:AkggwZm1QkOCtm50@namastenode.nx13u6w.mongodb.net/devTinder');
}

module.exports = connectDB;