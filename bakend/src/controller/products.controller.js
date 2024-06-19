const Products = require("../models/Products.model");

const listProduct = async (req, res) => {
    console.log("Get listProduct");

    try {

        const product = await Products.find()

        if (!product || product.length === 0) {
            res.status(404).json({
                succes: false,
                message: "Product data not found :" + error.message
            })
        }

        res.status(200).json({
            succes: true,
            messge: "Product data fetched.",
            data: product
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "Internal server error :" + error.message
        })
    }
}

const getProduct = async (req, res) => {
    console.log("Get getProduct");

    try {
        const product = await Products.findById(req.params.product_id)
        console.log(req.params.product_id);

        if (!product) {
            res.status(404).json({
                succes: false,
                message: "Product data not found ."
            })
        }

        res.status(200).json({
            succes: true,
            messge: "Product data fetched.",
            data: product
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "Internal server error :" + error.message
        })
    }

}

const addProduct = async (req, res) => {
    console.log("Add addProduct");

    try {
        const product = await Products.create(req.body);

        if (!product) {
            res.status(404).json({
                succes: false,
                message: "Product data not found ." 
            })
        }

        res.status(201).json({
            succes: true,
            messge: "Product data fetched.",
            data: product
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "Internal server error :" + error.message
        })
    }
}

const updateProduct = async (req, res) => {
    console.log("Update addProduct");

    try {
        const product = await Products.findByIdAndUpdate(req.params.product_id, req.body, { new: true, runValidators: true });

        if (!product) {
            res.status(404).json({
                succes: false,
                message: "Product data not found ."
            })
        }

        res.status(200).json({
            succes: true,
            messge: "Product data fetched.",
            data: product
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "Internal server error :" + error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    console.log("Delete deleteProduct");

    try {
        const product = await Products.findByIdAndDelete(req.params.product_id);
        // const product = await Products .findByIdAndDelete(req.params.product_id);
        // const product = await Products .deleteOne({_id:req.params.product_id});
        // const product = await Products.findByIdAndRemove(req.params.product_id);

        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product data not found."
            })
        }

        res.status(200).json({
            success: true,
            message: "Product deleted.",
            data: product
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "Internal server error :" + error.message
        })
    }
}

module.exports = {
    listProduct,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}