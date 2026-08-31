const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type : String,
            required: true,
            minlength: [3, 'first name should atleast be of 3 characters']
        },
        lastname: {
            type: String,
            minlength: [3, 'last name should atleast be of 3 characters']
        }
    },
    email:{
        type: String,
        required: true,
        minlength: [5,"Email should be of atleast 5 characters"]
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    // This field is for live tracking of driver's location with the user's 
    socketId:{
        type: String,
    },
})


userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({
        _id: this._id
    },
    process.env.JWT_SECRET);
    return token;
}

// This method is a user specific method will act specifically for the current instance of the user in real time 
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

// This method will run by default because we are using statics so every time the password is enetered in the db it be hashed firstly
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}


const userModel = mongoose.model('user',userSchema);

module.exports = userModel;