const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controller");
const authMiddleware = require("../Middlewares/auth.middleware");
// This is what we called it as destructuring
const { body } = require("express-validator")



router.post("/register", [

    body('email')
        .isEmail()
        .withMessage('Invalid Email'),

    body('fullname.firstname')
        .isLength({ min: 3 })
        .withMessage('First Name Should be at least 3 characters'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')

], userControllers.registerUser);


router.post("/login", [

    body('email')
        .isEmail()
        .withMessage('Invalid Email'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password Should Be Atleast 6 characters')

], userControllers.loginUser);

router.get('/profile',authMiddleware.authUser,userControllers.getUserProfile)

module.exports = router;