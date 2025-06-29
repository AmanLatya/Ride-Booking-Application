const userModel = require("../models/user-model")
const userServices = require("../services/user-services");
const { validationResult } = require("express-validator");

async function handleUserRegister(req, res) {

    const error = validationResult(req)

    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const { fullName, email, password } = req.body;

    console.log(req.body);
    const [hashedFirstName, hashedLastName, hashedEmail] = await userModel.encrypt([
        fullName.firstName,
        fullName.lastName,
        email
    ]);

    const hashedPassword = await userModel.hashPassword(password);
    const user = await userServices.createUser({
        firstName: hashedFirstName,
        lastName: hashedLastName,
        email: hashedEmail,
        password: hashedPassword
    })

    const token = await user.generateAuthToken();

    res.status(201).json({ token, user })
}

module.exports = {
    handleUserRegister
}
