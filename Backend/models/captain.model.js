const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            require: true,
            minlength: [3, 'Fisrtname must be atleast of 3 characters long '],
        },
        lastname:{
            type: String,
            minlength: [3,'Lastname must be atleast of 3 characters'],
        }
    },
    email:{
        type: String,
        require: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address']
    },
    password:{
        type: String,
        require: true,
        select: false,
        minlength: [6, 'Password must be atleast of 6 characters long'] 
    },
    socketId:{
        type: String,
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'   
    },
    role:{
        type: String,
        enum: ['captain', 'admin'],
        default: 'captain'
    },
    vehicle: {
        color:{
            type: String,
            require: true,
            minlength: [3, 'Color must be atleast of 3 characters long']
        },
        plateNumber:{
            type: String,
            require: true,
            minlength: [3, 'Plate Number must be atleast of 3 characters long']
        },
        capacity:{
            type: Number,
            require: true,  
            min: [1, 'Capacity must be atleast of 1'],
        },
        vehicleType:{
            type: String,
            require: true,
            enum: ['car', 'motorcycle', 'auto-rickshaw', 'van', 'bus'],
        },
    },
    location: {
        latitude: { 
            type: Number,
        },
        longitude: {
            type: Number,
        },
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
        { _id: this._id},
        process.env.JWT_SECRET,
        { expiresIn: '24h'}
    )
    return token;
}
captainSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}
captainSchema.statics.hashPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

const captainModel = mongoose.model('Captain', captainSchema)
module.exports = captainModel;