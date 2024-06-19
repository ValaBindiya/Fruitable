const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://bindiyavala:Bindiya%40123@cluster0.viqmoha.mongodb.net/ecommerce')
            .then(() => console.log("dataBase connect succesfully"))
            .catch((err) => console.log("DataBase error:" + err));
    } catch (error) {
        console.log("DataBase error:", error);
    }
}

module.exports = connectDB

// mongodb+srv://bindiyavala:Bindiya%40123@cluster0.viqmoha.mongodb.net/