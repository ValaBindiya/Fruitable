const Subcategories = require("../models/Subcategories.model");
const uploadFile = require("../utils/cloudinary");

const listSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategories.find();

        if (!subcategories || subcategories.length === 0) {
            res.status(404).json({
                succes: false,
                messege: "Subcategories not found."
            })
        }

        res.status(200).json({
            succes: true,
            messege: "Subcategories data fetched.",
            data: subcategories
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            messege: "Internal server error" + error.message
        })
    }
}

const getSubcategories = async (req, res) => {
    console.log("Get listSubcategories");

    try {
        const subcategories = await Subcategories.findById(req.params.subcategory_id)

        if (!subcategories) {
            res.status(404).json({
                succes: false,
                messege: "Subcategories not found."
            })
        }

        res.status(200).json({
            succes: true,
            messege: "Subcategories data fetched.",
            data: subcategories
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            messege: "Internal server error" + error.message
        })
    }
}

const getCategory = async (req, res) => {
    console.log("Get getCategory", req.params.category_id);

    try {
        const subcategories = await Subcategories.find({ category_id: req.params.category_id })

        console.log(subcategories);

        if (!subcategories || subcategories.length === 0) {
            res.status(404).json({
                succes: false,
                messege: "Product data not found :" + error.messege
            })
        }

        res.status(200).json({
            succes: true,
            messge: "Product data fetched.",
            data: subcategories
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            messege: "Internal server error :" + error.messege
        })
    }
}

const addSubcategories = async (req, res) => {
    console.log("Add listSubcategories");
    console.log(req.file);

    const fileRes = await uploadFile(req.file.path, 'subCategories');
    console.log(fileRes);

        try {
            const subcategories = await Subcategories.create({
                ...req.body,
                img: {
                    public_id: fileRes.public_id,
                    url: fileRes.secure_url
                }

            });

        if (!subcategories) {
            res.status(404).json({
                succes: false,
                messege: "Subcategories not found."
            })
        }

        res.status(201).json({
            succes: true,
            messege: "Subcategories data fetched.",
            data: subcategories
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            messege: "Internal server error" + error.message
        })
    }
}

const updateSubcategories = async (req, res) => {
    console.log("Update listSubcategories");

    try {
        const subcategories = await Subcategories.findByIdAndUpdate(req.params.subcategory_id, req.body, { new: true, runValidators: true });
        // console.log(req.body);
        console.log(subcategories);

        if (!subcategories) {
            res.subcategories(400).json({
                success: false,
                messege: "Subcategory data not found."
            })
        }

        res.status(200).json({
            success: true,
            messege: "Subcategory updated.",
            data: subcategories
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            messege: "Internal Server Error" + error.message
        })
    }
}

const deleteSubcategories = async (req, res) => {
    console.log("Delete listSubcategories");

    try {
        const subcategories = await Subcategories.findByIdAndDelete(req.params.subcategory_id);
        // const subcategories = await Subcategories.findByIdAndDelete(req.params.subcategory_id);
        // const subcategories = await Subcategories.deleteOne({_id:req.params.subcategory_id});
        // const subcategories = await Subcategories.findByIdAndRemove(req.params.subcategory_id);
        console.log(subcategories);

        if (!subcategories) {
            res.status(404).json({
                success: false,
                messege: "Subcategories data not found."
            })
        }

        res.status(200).json({
            success: true,
            messege: "Subcategories deleted.",
            data: subcategories
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            messege: "Internal Server Error" + error.message
        })
    }
}

module.exports = {
    listSubcategories,
    getSubcategories,
    addSubcategories,
    updateSubcategories,
    deleteSubcategories,
    getCategory
}