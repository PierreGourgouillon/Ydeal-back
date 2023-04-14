const express = require('express');
const router = express.Router();
const authController = require('../controllers/users');
const { auth } = require('firebase-admin');

router.post('/', authController.registerUser);
router.put('/:userId', authController.updateUser);
router.get('/', authController.getUsers);
router.get('/:userId', authController.getUserId);
router.delete('/', authController.deleteUser);
module.exports = router;