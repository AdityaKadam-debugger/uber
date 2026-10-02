const userModel = require('../models/user.model');
const captainModel = require("../models/captain.model")
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require("../models/blacklistToken");

module.exports.authUser = async (req, res, next) => {
    try {

        // 1. Get token
        const token =
            req.cookies.token ||
            req.headers.authorization?.split(' ')[1];

        // 2. Check token exists
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // 3. Check blacklist
        const isBlackListed = await blacklistTokenModel.findOne({
            token: token
        });

        if (isBlackListed) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // 4. Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // 5. Find user
        const user = await userModel.findById(decoded._id);

        // 6. Check user exists
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // 7. Attach user to request
        req.user = user;

        // 8. Continue to controller
        return next();

    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
};

module.exports.authCaptain = async(req,res,next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(400).json({
            message: "Unauthorized"
        });
    }

    const isBlackListed = await blacklistTokenModel.findOne({ token : token });

    if(isBlackListed){
        return res.status(400).json({
            message: "Captain is Logged-out"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
    }catch(err){
        return res.status(400).json({
            message: "Unauthorized"
        })
    }
}