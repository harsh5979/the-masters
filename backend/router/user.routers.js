const express = require('express')
const { body } = require('express-validator')
const { checkAuth, register, verifyOtp, login, logout, forgotPassword, resetPassword, completeProfile,getProfile } = require('../controller/user.controller')
const { verifyToken } = require('../middleware/verifyToken')

const router = express.Router()

router.get('/check-auth', verifyToken, checkAuth)
router.post("/register",
    //      [
    //     body('email').isEmail().withMessage('Invalid Email'),
    //     body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
    //     body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long')
    // ],
    register)

router.post('/logout', logout)
router.post('/login', login)
router.post("/verify-email", verifyOtp)
router.post("/forgot-password", forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.post('/complete-profile',verifyToken, completeProfile)
router.get('/profile',verifyToken, getProfile)




module.exports = router;    