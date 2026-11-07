const mongoose = require('mongoose');
const { Schema } = mongoose;
const { validator } = require('validator')

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 10
    },
    laseName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        lowerCase: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email address')
            }
        }
    },
    password: {
        type: String,
        required: true,
         validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Enter a strong password')
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoURL: {
        type: String,
        default: "https://img.magnific.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg?semt=ais_hybrid&w=740&q=80",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('Invalid Photo URL')
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about of the user"
    },
    skills: {
        type: [String]
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);