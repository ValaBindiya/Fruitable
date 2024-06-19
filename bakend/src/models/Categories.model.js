const mongoose = require('mongoose')

const categoriesSchema = new mongoose.Schema(
    {
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
        versionKey: false,
    }
)

const Categories = mongoose.model('Categories', categoriesSchema)
module.exports = Categories;