const blacklistToken = require('../models/blacklistToken');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const cookieParser = require('cookie-parser');

module.exports.registerCaptain = async (req,res,next) => {

    // Firstly Checking whether any error is occuring in the upcoming request so that we can handle the errors

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    // Destructuring all the credentails coming from the request 
    const { fullname , email , password , vehicle } = req.body;

    // Also Checking whether any new captain is trying to register with the existing email in the db 
    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if(isCaptainAlreadyExist){
        return res.status(400).json({
            message: "Captain Already Exists"
        })
    }

    // Therefore Now Hashing The Password
    const hashedPassowrd = await captainModel.hashPassword(password);

    // Creating a captain data in the db with the help of the service we created

    const captain = await captainService.createCapatin({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassowrd,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(200).json({
        message: "Captain Created Successfully",
        token,
        captain
    });

}

module.exports.loginCaptain = async(req,res,next) => {
    // Checking for the errors

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    // Fetching All the credentials 
    const {email , password } = req.body;

    // Finding The Captain
    const captain = await captainModel.findOne({ email }).select('+password');


    if(!captain){
        return res.status(400).json({
            message: "User Not Found"
        })
    }
    // Matching The Passowrd
    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(400).json({
            message: "Invalid Passowrd"
        })
    }

    // Generating Token
    const token = await captain.generateAuthToken();
    res.cookie('token',token)

    res.status(200).json({
        message:"Logged-in Successfully",
        captain,
        token
    })

}

module.exports.getCaptainProfile = async(req,res,next) => {
    res.status(200).json({
        captain: req.captain
    })
}

module.exports.logoutCaptain = async(req,res,next) => {

    const token = req.cookie.token || req.headers.authorization?.split(' ')[ 1 ];

    await blacklistToken.create({ token });
    res.clearCookie('token');

    res.status(200).json({
        message: "Captain Logged-out Successfully"
    })
}