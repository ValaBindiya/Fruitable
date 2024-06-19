const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema(
    {
        order_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Orders',
            require: true,
        },
        type: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
        },
        status: {
            type: String,
            required: true,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const Payments = mongoose.model('Payments', paymentSchema)
module.exports = Payments