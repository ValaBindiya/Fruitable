const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
            unique: true
        },
        address: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            required: true
        },
        password: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
        },
        mobile_no: {
            type: Number,
            required: true,
            max: 10
        },
        role: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
            unique: true
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

const Users = mongoose.model('Users', usersSchema)
module.exports = Users