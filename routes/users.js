const express = require('express');
const router = express.Router();
const authController = require('../controllers/users');
const { auth } = require('firebase-admin');

router.post('/', authController.registerUser);
router.post('/:userId', authController.updateUser);
// router.get('/me', authController.me);
router.get('/', authController.getUsers);
router.get('/:userId', authController.getUserId);

module.exports = router;