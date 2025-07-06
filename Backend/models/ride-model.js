const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    caption: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Caption'
    },
    pickup: {
        type: String,
        required: true,
        minlength: [3, 'Pickup location must be at least 3 characters']
    },
    destination: {
        type: String,
        required: true,
        minlength: [3, 'Destination must be at least 3 characters']
    },
    vehicleType: {
        type: String,
        required: true,
        enum: ['car', 'bike', 'auto'],
        default: 'car'
    },
    fare: {
        type: Number,
        required: true
    },
    otp:{
        type: String,
        required: true,
        select: false
    },
    status: {
        type:String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number
    }, distance: {
        type: Number
    },
    paymentID: {
        type: String
    },
    orderID: {
        type: String
    },
    signature: {
        type: String
    }
});


module.exports = mongoose.model('Ride', rideSchema);