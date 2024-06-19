const mongoose = require('mongoose');

const attributesShema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
            unique: true
        },
        value:{
            type: String,
            require:true,
        }, 
        quantity:{
            type:Number,
            require:true,
            default:1
        },
        stock:{
            type:Number,
            require:true
        }
    }
)

const variantSchema = new mongoose.Schema(
    {
        p_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Products',
            required: true
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

const Variants = mongoose.model('Variants', variantSchema)
module.exports = Variants