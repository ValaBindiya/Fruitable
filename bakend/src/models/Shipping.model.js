const mongoose = require('mongoose')

const shippingSchema = new mongoose.Schema(
    {
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
            require: true,
        },
        order_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Orders',
            require: true
        },
        current_place: {
            type: String,
            require: true,
            trim: true,
            lowercase: true,
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

const Shippings = mongoose.model('Shippings', shippingSchema)
module.exports = Shippings