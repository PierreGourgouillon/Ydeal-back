const express = require('express');
const router = express.Router();
const authController = require('../controllers/products');
const authMiddleware = require('../middlewares/auth');

router.post('/', authController.registerProduct);
router.post('/:productId', authController.favoriteProduct);
router.put('/:productId', authController.updateProduct);
router.get('/', authController.getAllProducts);
router.get('/:productId', authController.getProduct);
router.delete('/:productId', authMiddleware, authController.deleteProduct);

module.exports = router;