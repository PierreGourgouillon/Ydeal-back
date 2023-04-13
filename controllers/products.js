const Product = require('../models/productModel');

exports.registerProduct = async (req, res, next) => {
    const product = new Product({
        ...req.body,
        ownerId: req.user.firebaseId
    })
    try {
        await product.save()
        res.status(201).json({
            error: null,
            data: {}
        });
    } catch (error) {
        res.status(400).json({
            error: "INTERNAL_ERROR",
            data: {}
        });
    }
}

exports.getProduct = async (req, res, next) => {
    const filter = { _id: req.params.productId };

    try {
        let product = await Product.findOne(filter);
        res.status(201).json({
            error: null,
            data: product
        });
    } catch (error) {
        res.status(400).json({
            error: "INTERNAL_ERROR",
            data: {}
        });
    }
}

exports.getAllProducts = async (req, res, next) => {
    try {
        let products = await Product.find({});
        res.status(201).json({
            error: null,
            data: products
        });
    } catch (error) {
        res.status(400).json({
            error: "INTERNAL_ERROR",
            data: {}
        });
    }
}

exports.updateProduct = async (req, res, next) => {
    const filter = { _id: req.params.productId };
    const update = { ...req.body };

    try {
        let productUpdated = await Product.findOneAndUpdate(filter, update, {new: true});
        res.status(201).json({
            error: null,
            data: productUpdated
        });
    } catch (error) {
        res.status(400).json({
            error: "INTERNAL_ERROR",
            data: {}
        });
    }
}

exports.deleteProduct = async (req, res, next) => {
    const filter = { _id: req.params.productId };

    try {
        const product = Product.findOne(filter);
        if (product.ownerId != req.user.firebaseId) {
            return res.status(401).json({
                error: "NOT_OWNER_ERROR",
                data: {}
            });
        }
        await Product.deleteOne(filter);
        res.status(201).json({
            error: null,
            data: {}
        });
    } catch (error) {
        res.status(400).json({
            error: "INTERNAL_ERROR",
            data: {}
        });
    }
}

