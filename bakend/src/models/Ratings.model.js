const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            require: true,
        },
        user_id:{
            type: mongoose.Types.ObjectId,
            ref: 'User',
            require: true
        },
        rating: {
            type: Number,
            required: true,
        },
        review: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
        },
        img: {
            type: String,
            trim: true,
            lowercase: true,
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

const Ratings = mongoose.model('Ratings', ratingSchema)
module.exports = Ratings