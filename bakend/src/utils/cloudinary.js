const cloudinary = require('cloudinary').v2

// Configuration
cloudinary.config({
    cloud_name: "dbgoklrfj",
    api_key: "968655873395213",
    api_secret: "Mp6WWkCiBODHTnDHSYDVgEHU3T8" // Click 'View Credentials' below to copy your API secret
});

const uploadFile = async (imgPath, folderName) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(imgPath, {
            folder: folderName
        })

        return uploadResult;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = uploadFile