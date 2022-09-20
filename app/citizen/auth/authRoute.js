import express from 'express'
import { loginAdmin, loginUser, logoutAdmin, logoutUser, me, registerAdmin, registerUser } from './authController.js'
const router = express.Router()

// Citizen / user
router.post('/auth', registerUser)
router.post('/auth/login', loginUser)
router.get('/auth/me', me)
router.delete('/auth/logout', logoutUser)
// Admin
router.post('/auth/admin', registerAdmin)
router.post('/auth/admin/login', loginAdmin)
router.delete('/auth/admin/logout', logoutAdmin)

export default router