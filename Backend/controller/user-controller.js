const userModel = require("../models/user-model")
const userServices = require("../services/user-services");
const { validationResult } = require("express-validator");
const blackListModel = require("../models/black-list-token");

async function handleUserRegister(req, res, next) {
    const error = validationResult(req)

    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const { fullName, email, password } = req.body;

    console.log(req.body);
    // const [hashedFirstName, hashedLastName, hashedEmail] = await userModel.hashDetails([
    //     fullName.firstName,
    //     fullName.lastName,
    //     email
    // ]);

    const hashedPassword = await userModel.hashPassword(password);
    const user = await userServices.createUser({
        // firstName: hashedFirstName,
        // lastName: hashedLastName,
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        // email: hashedEmail,
        email,
        password: hashedPassword
    })

    const token = await user.generateAuthToken();

    res.status(201).json({ token, user })
}

async function handleUserLogin(req, res, next) {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const { email, password } = req.body;
    console.log(req.body);
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await user.compareHashedDetails(password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await user.generateAuthToken();
    res.cookie('token', token)
    res.status(200).json({ token, user });
}

async function handleGetUserProfile(req, res, next) {
    const user = req.user;
    console.log("User profile:", user);
    res.status(200).json({ user });
};

async function handleUserLogout(req, res, next) {
    res.clearCookie('token');
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    // Add the token to the blacklist
    await blackListModel.create({ token });
    res.status(200).json({ message: "Logged out successfully" });
}

module.exports = {
    handleUserRegister, handleUserLogin, handleGetUserProfile,handleUserLogout
}
