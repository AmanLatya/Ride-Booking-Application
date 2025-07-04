const express = require("express");
const router = Router.express();
const { body } = require('express-validator');
const authMiddleware = require("../middlewares/auth-middleware");
const rideController = require("../controller/ride-controller")

router.get("/create", 
    authMiddleware.authUser, 
    body("pickup").isString().isLength({min: 3}).withMessage("Invalid Pickup Location"),
    body("destination").isString().isLength({min:3}.withMessage("Invalid Destination")),
    body('vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Vehicle Type must be one of car, bike, or auto'),

    rideController.createRide)

module.exports = router;
