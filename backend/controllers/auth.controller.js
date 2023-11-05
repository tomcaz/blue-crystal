const express = require('express')
const { login, passwordReset, refreshToken, signup, validate, logout } = require('../services/auth.service')
const router = express.Router()

// define the home page route
router.post('/', login);
router.post('/logout', logout);
router.post('/signup', signup);
router.post('/reset', passwordReset);
router.get('/refreshToken', refreshToken);
router.post('/validate', validate);


module.exports = router