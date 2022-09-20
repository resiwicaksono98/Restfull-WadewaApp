import express from 'express'
import { loginAdmin, logoutAdmin, me, registerAdmin } from './authAdminController.js'
const router = express.Router()

router.post('/auth/admin', registerAdmin)
router.post('/auth/admin/login', loginAdmin)
router.get('/auth/admin/me', me)
router.delete('/auth/admin/logout', logoutAdmin)

export default router