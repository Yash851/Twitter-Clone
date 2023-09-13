const express = require('express')
const {userSignup, userLogin} = require('../Controllers/userController')
const router = express.Router()

//signup route
router.post('/signup', userSignup)
//login route
router.post('/login', userLogin)
module.exports = router