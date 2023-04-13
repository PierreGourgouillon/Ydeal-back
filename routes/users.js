const express = require('express');
const router = express.Router();
const authController = require('../controllers/users')

router.post('/', authController.registerUser);
// router.get('/me', authController.me);

module.exports = router;