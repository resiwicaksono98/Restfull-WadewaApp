import express from 'express'
import { adminOnly } from '../../../middleware/authUser.js'
import { loginAdmin, logoutAdmin, me, registerAdmin } from './authAdminController.js'
const router = express.Router()

router.post('/admin/auth/register', registerAdmin)
router.post('/admin/auth/login', loginAdmin)
router.get('/admin/auth/me', adminOnly, me)
router.delete('/admin/auth/logout',adminOnly, logoutAdmin)

export default router