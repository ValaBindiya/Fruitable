const mongoose = require('mongoose');

const itemShema = new mongoose.Schema(
    {
        p_id: {
            type: mongoose.type.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }
)

const cartSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        item: [itemShema],
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

const Carts = mongoose.model('Carts', cartSchema)
module.exports = Carts