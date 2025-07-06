const rideServices = require("../services/ride-services");
const { validationResult } = require('express-validator');

module.exports.createRide = async(req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors : error.array()});
    }

    const {pickup, destination, vehicleType} = req.body;
    try{
        const ride = await rideServices.createRideService({ user: req.user._id, pickup, destination, vehicleType});
        return res.status(201).json(ride);
    }catch(err){
        return res.status(400).json({message : err.message})
    }
}

module.exports.getFare = async (req, res) => {
    const { pickup, destination } = req.query;

    if (!pickup || !destination) {
        return res.status(400).json({ message: "Pickup and Destination are required" });
    }

    try {
        const fare = await rideServices.getFare(pickup, destination);
        res.json(fare);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}