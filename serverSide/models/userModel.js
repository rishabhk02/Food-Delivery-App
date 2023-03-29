const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type:String,
        default: 'Customer'
    }
},{timestamps: true});

module.exports = new mongoose.model('userData',userSchema);