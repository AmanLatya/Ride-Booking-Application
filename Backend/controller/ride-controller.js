const rideServices = require("../services/ride-services");
const { body, validationResult } = require('express-validator');
const mapServices = require("../services/maps-services");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride-model");

module.exports.createRide = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { pickup, destination, vehicleType, rideFare, pickupCoords, destinationCoords } = req.body;
    try {
        const ride = await rideServices.createRideService({ user: req.user._id, pickup, destination, vehicleType, rideFare });
        // console.log("Ride Created - ", ride)
        // console.log(ride);
        res.status(201).json(ride);
        // console.log(pickupCoords);
        // console.log(`1. ${pickupCoords[0]}, 2. ${pickupCoords[1]}`);
        const CaptionsInRadius = await mapServices.getCaptionsInRadius(pickupCoords[0], pickupCoords[1], 1);

        // console.log(CaptionsInRadius);
        ride.otp = "";

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
        CaptionsInRadius.map((caption) => {
            // console.log(caption, ride);
            if (caption.socketID != null) {
                sendMessageToSocketId(caption.socketID, {
                    event: 'new-ride',
                    data: rideWithUser
                })
            }
        })
        // return res.status(201).json(CaptionsInRadius);
    } catch (err) {
        return res.status(400).json({ message: err.message })
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

module.exports.rideAccept = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideServices.rideAcceptService({
            rideId,
            caption: req.caption
        });

        return res.status(200).json(ride);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

module.exports.sendMessage = async (req, res, next) => {
    const { ride } = req.body;
    console.log(`Ride - : ${ride}`)
    console.log(`Ride Status- : ${ride.status}`)
    try {
        if(ride.status === "accepted"){
            sendMessageToSocketId(ride.user.socketID, {
                event: "ride-accepted",
                data: ride
            })
        }
        if(ride.status === "ongoing"){
            sendMessageToSocketId(ride.user.socketID, {
                event: "ride-started",
                data: ride
            })
        }
    } catch (err) {
        consol.log(err);
        return res.status(500).json({ message: err });
    }
}

module.exports.cancleRide = async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
    }

    const { rideID } = req.query;

    try {
        const ride = await rideServices.cancleRideService({ rideID });
        console.log("controller - 106 : ", ride)
        sendMessageToSocketId(ride.caption.socketID, {
            event: 'ride-cancelled',
            data: 'Ride Cancelled'
        })
        return res.status(200).json({ message: "Ride Canclled" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
}

module.exports.startRide = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { rideID, otp } = req.query;

    try {
        const ride = await rideServices.startRide({ rideID, otp });
        console.log("Cont 128 : ",ride);
        sendMessageToSocketId(ride.caption.socketID, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}