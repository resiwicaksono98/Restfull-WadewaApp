import express from 'express'
import { verifyUserCitizen } from '../../../middleware/authUser.js'
import { loginUser, logoutUser, me, registerUser } from './authController.js'
const router = express.Router()

router.post('/auth', registerUser)
router.post('/auth/login', loginUser)
router.get('/auth/me', verifyUserCitizen, me)
router.delete('/auth/logout', verifyUserCitizen, logoutUser)


export default router