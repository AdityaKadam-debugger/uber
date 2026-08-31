const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controller")
// This is what we called it as destructuring
const { body } = require("express-validator")



router.post("/resgister",[
    body(('email').isEmail().withMessage('Invalid Email')),
    body('fullname.firstname').isLength({ min : 3}),withMessage('First Name Should be atleast of 3 charactres'),
    body('password').isLength({ min : 6}).withMessage('Password must be atleast of 6 characters')
],
   userControllers.registerUser 
    )

module.exports = router;