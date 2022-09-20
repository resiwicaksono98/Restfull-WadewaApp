import express from 'express'
import {loginUser, logoutUser, me, registerUser } from './authController.js'
const router = express.Router()

router.post('/auth', registerUser)
router.post('/auth/login', loginUser)
router.get('/auth/me', me)
router.delete('/auth/logout', logoutUser)


export default router