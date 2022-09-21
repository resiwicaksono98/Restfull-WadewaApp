import express from 'express'
import { adminOnly } from '../../../middleware/authUser.js'
import { createLetter, destroyLetter, getLatterById, getLetter, updateLetter } from './lettersAdminController.js'

const router = express.Router()


router.post('/admin/letters', adminOnly, createLetter)
router.get('/admin/letters', adminOnly, getLetter)
router.get('/admin/letters/:letterId', adminOnly, getLatterById)
router.put('/admin/letters/:letterId', adminOnly, updateLetter)
router.delete('/admin/letters/:letterId',adminOnly,  destroyLetter)

export default router