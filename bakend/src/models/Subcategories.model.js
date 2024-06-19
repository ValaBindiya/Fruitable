const mongoose = require('mongoose');

const subcategoriesSchema = new mongoose.Schema(
    {
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Categories',
            required: true
        },
        name: {
            type: String,
            trim: true,
            lowercase: true,
            required: true
        },
        description: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
        },
        img: {
            type: {
                public_id: String,
                url: String,
            }
        },
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

const Subcategories = mongoose.model('Subcategories', subcategoriesSchema)
module.exports = Subcategories