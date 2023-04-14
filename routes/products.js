const express = require('express');
const router = express.Router();
const authController = require('../controllers/products');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, authController.registerProduct);
router.put('/:productId', authMiddleware, authController.updateProduct);
router.get('/', authController.getAllProducts);
router.get('/:productId', authController.getProduct);
router.delete('/:productId', authMiddleware, authController.deleteProduct);

module.exports = router;