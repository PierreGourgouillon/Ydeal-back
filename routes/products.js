const express = require('express');
const router = express.Router();
const authController = require('../controllers/products')

router.post('/', authController.registerProduct);
router.put('/:productId', authController.updateProduct);
router.get('/', authController.getAllProducts);
router.get('/:productId', authController.getProduct);
router.delete('/:productId', authController.deleteProduct);
// router.get('/me', authController.me);

module.exports = router;