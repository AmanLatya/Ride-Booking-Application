const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captionSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type: String,
            required: true,
            minlength: [3, 'First Name must be at least 3 characters']
        },
        lastName:{
            type: String,
            minlength: [3, 'Last Name must be at least 3 characters']
        }
    },
    email:{
        type: String,
        required: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'],
        minlength: [11, 'Email must be at least 5 characters'],
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters']
    },
    socketID:{
        type: String
    },
    status:{
        type: String,   
        enum: ['active', 'inactive', 'banned'],
        default: 'inactive'
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters']
        },
        vehicleNumber:{
            type: String,
            required: true,
            minlength: [10, 'Vehicle Number must be at least 3 characters']
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ['car', 'bike', 'bus'],
            default: 'car'
        }
    },
    location:{
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    }
})


captionSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_CAPTION_SECRET);
    return token;
}

captionSchema.methods.compareHashedPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captionSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


const captionModel = mongoose.model('caption', captionSchema);

module.exports = captionModel;