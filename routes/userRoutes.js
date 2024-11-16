const express = require('express');
const { signIn, signUp, current, updateUser, delUser } = require('../controller/userController');
const validatingToken = require('../middleware/validateToken');

const router = express.Router();

router.route('/signIn').post(signIn)
router.route('/signUp').post(signUp);
router.route('/current').get(validatingToken,current)


module.exports = router