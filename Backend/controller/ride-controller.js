const rideServices = require("../services/ride-services");
const {validationResult } = require('express-validator');
const {body} = require("express-validator");

module.exports.createRide = async(req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors : error.array()});
    }

    const {pickup, destination, vehicleType, rideFare} = req.body;
    try{
        const ride = await rideServices.createRideService({ user: req.user._id, pickup, destination, vehicleType, rideFare});
        console.log("Ride Created - ", ride)
        return res.status(201).json(ride);
    }catch(err){
        return res.status(400).json({message : err.message})
    }
}

module.exports.getFare = async (req, res) => {
    const { pickupCoords, destinationCoords } = req.body;

    if (!pickupCoords || !destinationCoords || pickupCoords.length !== 2 || destinationCoords.length !== 2) {
        return res.status(400).json({ message: "Invalid Coordinates " });
    }

    try {
        const fare = await rideServices.getFare(pickupCoords, destinationCoords);
        res.json(fare);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}