const express = require("express");
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require("../middlewares/auth-middleware");
const rideController = require("../controller/ride-controller")

router.post("/create",
    authMiddleware.authUser,
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid Pickup Location"),
    body("destination").isString().isLength({ min: 3 }).withMessage("Invalid Destination"),
    body("vehicleType").isIn(['car', 'bike', 'auto']).withMessage('Vehicle Type must be one of car, bike, or auto'),
    body("rideFare")
        .isNumeric()
        .withMessage("Ride fare must be a valid number"),

rideController.createRide)

// In ride-routes.js
router.post("/get-fare", authMiddleware.authUser, rideController.getFare);

module.exports = router;
