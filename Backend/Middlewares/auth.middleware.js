const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports.authUser = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
    if(!token){
        req.res(400).json({
            message: "Unauthorized"
        })
    }
    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // After Decoding we will get the user id coz we were sending the user id as well while creating a token as you can see in the usermodel 
        const user =  await userModel.findById(decoded._id);
        req.user = user;
        return next();
    }
    catch(err){
        return res.status(400).json({
            message: "Unauthorized"
        })
    }
}