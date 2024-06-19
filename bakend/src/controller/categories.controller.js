const Categories = require("../models/Categories.model");
const uploadFile = require("../utils/cloudinary");

const listCategories = async (req, res) => {

    try {
        const categories = await Categories.find()

        if (!categories || categories.length === 0) {
            res.status(404).json({
                success: false,
                messege: "Categtories data not found."
            })
        }

        res.status(200).json({
            success: true,
            messege: "Categories data fetch.",
            data: categories
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            messege: "Internal Server Error" + error.messege
        })
    }
}

const getCategories = async (req, res) => {
    try {

        const category = await Categories.findById(req.params.category_id);

        if (!category) {
            res.status(404).json({
                success: false,
                messege: "Categtories data not found."
            })
        }

        res.status(200).json({
            success: true,
            messege: "Categories fetched.",
            data: category
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            messege: "Internal Server Error" + error.messege
        })
    }
}

const addCategories = async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const fileRes = await uploadFile(req.file.path, 'categories');
    console.log(fileRes);

    const category = await Categories.create({
        ...req.body,
        img: {
            public_id: fileRes.public_id,
            url: fileRes.url
        }

    });
    console.log(category);

    try {
        if (!category) {
            res.status(400).json({
                success: false,
                messege: "Category not created."
            })
        }

        res.status(201).json({
            success: true,
            messege: "Category created successfully.",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            messege: "Internal Server Error" + error.messege
        })
    }


}

const updateCategories = async (req, res) => {
    console.log("Update listCategories");
    try {
        if (req.file) {
            console.log("id", req.params.category_id);
            console.log("body", req.body);

            const fileRes = await uploadFile(req.file.path, 'categories');

            const category = await Categories.findByIdAndUpdate(req.params.category_id,
                {
                    ...req.body
                    , img: {
                        public_id: fileRes.public_id,
                        url: fileRes.url
                    }
                }, { new: true, runValidators: true });

            if (!category) {
                res.status(400).json({
                    success: false,
                    messege: "Categtories data not found."
                })
            }

            res.status(200).json({
                success: true,
                messege: "Categories updated.",
                data: category
            })

        } else {

            const category = await Categories.findByIdAndUpdate(req.params.category_id, req.body, { new: true, runValidators: true });
            console.log(req.params.category_id, req.body);

            if (!category) {
                res.status(400).json({
                    success: false,
                    messege: "Categtories data not found."
                })
            }

            res.status(200).json({
                success: true,
                messege: "Categories updated.",
                data: category
            })

        }

        //     if (!category) {
        //         res.status(400).json({
        //             success: false,
        //             messege: "Categtories data not found."
        //         })
        //     }

        //     res.status(200).json({
        //         success: true,
        //         messege: "Categories updated.",
        //         data: category
        //     })

    } catch (error) {
        res.status(500).json({
            success: false,
            messege: "Internal Server Error" + error.messege
        })
    }
}


const deleteCategories = async (req, res) => {
    try {
        const category = await Categories.findByIdAndDelete(req.params.category_id);
        console.log(category);

        if (!category) {
            res.status(404).json({
                success: false,
                messege: "Categtories data not found."
            })
        }

        res.status(200).json({
            success: true,
            messege: "Category deleted.",
            data: category
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            messege: "Internal Server Error" + error.messege
        })
    }
}

module.exports = {
    getCategories,
    listCategories,
    addCategories,
    updateCategories,
    deleteCategories
}