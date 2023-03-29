const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userData',
        required: true
    },

    items:{
        type: Object,
        required: true
    },

    phone:{
        type: Number,
        required: true
    },

    deliveryAddress:{
        type: String,
        required: true
    },

    paymentType:{
        type: String,
        default: 'COD'
    },

    status:{
        type: String,
        default: "Placed"
    }
},{timestamps: true});

module.exports = new mongoose.model('order',orderSchema);
