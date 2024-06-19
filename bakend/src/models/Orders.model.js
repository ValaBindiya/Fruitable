const mongoose = require('mongoose');

const attributesShema = new mongoose.Schema(
    {
        p_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: true
        }, 
        quantity:{
            type:Number,
            require:true,
            default:1
        }
    }
)

const ordercartSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        address:{
            type: String,
            trim: true,
            lowercase: true,
            required: true,
            unique: true
        },
        amount:{
            type:Number,
            require:true
        },
        attributes: [attributesShema],
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Orders = mongoose.model('Orders', ordercartSchema)
module.exports = Orders