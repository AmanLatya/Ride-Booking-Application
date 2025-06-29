const express = require("express");
const router = express.Router();

const {handleUserRegister} = require("../controller/user-controller")

const {body} = require("express-validator");

router.post("/register",[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullName.firstName').isLength({min: 3}).withMessage('First Name must be atleast 3 characters long'),
    body('password').isLength({min : 6}).withMessage("Password Must be at least 6 characters long") 
],handleUserRegister)


module.exports = router;