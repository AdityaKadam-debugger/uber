const captainModel = require('../models/captain.model');

// All these credentials are necessary

module.exports.createCapatin = async({
    firstname,lastname,email,password,
    color,plate,capacity,vehicleType
})=>{
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error("All Fields are required")
    }
    const captain = captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain;
}