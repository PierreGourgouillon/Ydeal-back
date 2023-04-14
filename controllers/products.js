const Product = require('../models/productModel');
const User = require('../models/userModel');

exports.registerProduct = async (req, res, next) => {
    let product = new Product({
        ...req.body,
        ownerId: req.user.firebaseId
    })
    try {
        await product.save().then(savedProduct => { product = savedProduct})
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

exports.favoriteProduct = async (req, res, next) => {
    const productFilter = { _id: req.params.productId };
    const userFilter = { firebaseId: req.user.firebaseId };

    try {
        const product = await Product.findOne(productFilter);
        let user = await User.findOne(userFilter);

        if (product.ownerId == user.firebaseId) {
            return res.status(401).json({
                error: "IS_OWNER_ERROR",
                data: {}
            });
        }

        if (user.favorites.includes(product._id)){
            user.favorites = user.favorites.splice(user.favorites.indexOf(product._id), 0)
        } else user.favorites.push(product._id);
        
        user.save()

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

