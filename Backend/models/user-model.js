const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First Name must be atleast 3 character']
        },
        lastName: {
            type: String,
            minlength: [3, 'Last Name must be atleast 3 character']
        },
    },
    email: {
        type: String,
        required: true,
        minlength: [5, 'Email must be at least 5 character']
    },
    password: {
        type: String,
        required: true
    },
    socketID: {
        typeof: String
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_TOKEN)
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

userSchema.statics.encrypt = async function (dataArray) {
    if (!Array.isArray(dataArray)) {
        throw new Error("encrypt expects an array");
    }

    const encryptedArray = await Promise.all(
        dataArray.map(item => bcrypt.hash(item, 7))
    );

    return encryptedArray;
};


const userModel = mongoose.model('user', userSchema);

module.exports = userModel;