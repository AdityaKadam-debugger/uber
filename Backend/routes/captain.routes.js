const captainControllers = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../Middlewares/auth.middleware")

router.post('/register',[
    body('email')
        .isEmail()
        .withMessage('Invalid Email'),  
    body('fullname.firstname')
        .isLength({ min: 3 })
        .withMessage('First Name Should be at least 3 characters'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    body('vehicle.color')
        .isLength({ min: 3 })
        .withMessage('Color Should be at least 3 characters'),
    body('vehicle.plate')
        .isLength({ min: 3 })
        .withMessage('Plate Number Should be at least 3 characters'),
    body('vehicle.capacity')
        .isInt({ min: 1 })
        .withMessage('Capacity Should be at least 1'),
    body('vehicle.vehicleType')
        .isLength({ min: 3 })
        .withMessage('Vehicle Type Should be at least 3 characters'),
],
captainControllers.registerCaptain
); 

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min : 4}).withMessage("Password must be atleast contain 4 characters")
],
    captainControllers.loginCaptain
)
router.get('/profile',authMiddleware.authCaptain,captainControllers.getCaptainProfile)
router.post('/logout',captainControllers.logoutCaptain)
module.exports = router;