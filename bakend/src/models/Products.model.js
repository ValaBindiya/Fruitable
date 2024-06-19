const mongoose = require('mongoose')


const productSchema = new mongoose.Schema(
    {
        category_id: {
            type: mongoose.Types.ObjectId,
            ref:'Categories',
            require: true,
        },
        subCategory_id:{
            type: mongoose.Types.ObjectId,
            ref:'Subcategories',
            require: true
        },
        // seller_id:{
        //     type: mongoose.Types.ObjectId,
        //     ref:'Sellers',
        //     require: true
        // },
        name: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
            unique: true
        },
        description: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
        },
        img: {
            type: String,
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

const Products = mongoose.model('Products', productSchema)
module.exports = Products