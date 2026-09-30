const captainControllers = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();
const { body } = require("express-validator");


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



module.exports = router;