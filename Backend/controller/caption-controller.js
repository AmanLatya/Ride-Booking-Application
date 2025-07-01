const captionModel = require('../models/caption-model');
const captionServices = require('../services/caption-services');
const { validationResult } = require('express-validator');
const blackListModel = require('../models/black-list-token');

module.exports.handleCaptionRegister = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { fullName, email, password, vehicle } = req.body;
    const isEmailExists = await captionModel.findOne({email});
    if (isEmailExists) {
        return res.status(400).json({ message: "Caption already exists" });
    }

    const hashedPassword = await captionModel.hashPassword(password);
    try {
        const caption = await captionServices.createCaption({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashedPassword,
            color: vehicle.color,
            vehicleNumber: vehicle.vehicleNumber,
            vehicleType: vehicle.vehicleType,
        });
        const token = await caption.generateAuthToken();
        res.status(201).json({ token, caption});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.handleCaptionLogin = async (req,res,next) =>{
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { email, password } = req.body;
    const caption = await captionModel.findOne({ email });
    if (!caption) {
        return res.status(404).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = await caption.compareHashedPassword(password);
    if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await caption.generateAuthToken();
    res.cookie('captionToken',token);
    res.status(200).json({msg: "Login successful", token, caption });
}

module.exports.handleGetCaptionProfile = async (req, res, next) => {
    const caption = req.caption;
    if (!caption) {
        return res.status(404).json({ message: "Caption not found" });
    }
    res.status(200).json({Profile:"Caption Profile", caption });
}

module.exports.handleCaptionLogout = async (req, res, next) => {
    const caption = req.caption;
    if (!caption) {
        return res.status(404).json({ message: "Caption not found" });
    }

    const token = req.cookies?.captionToken || req.headers.authorization?.split(" ")[1];
    res.clearCookie('captionToken');
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    
    await blackListModel.create({token});
    await captionModel.findByIdAndUpdate(caption._id, { socketID: null });
    await captionModel.findByIdAndUpdate(caption._id, { status: 'inactive' });

    res.status(200).json({ message: "Logout successful" });
}