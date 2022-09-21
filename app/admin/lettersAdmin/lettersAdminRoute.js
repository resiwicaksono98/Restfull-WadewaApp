import express from 'express'
import { createLetter, destroyLetter, getLatterById, getLetter, updateLetter } from './lettersAdminController.js'

const router = express.Router()


router.post('/admin/letters', createLetter)
router.get('/admin/letters', getLetter)
router.get('/admin/letters/:letterId', getLatterById)
router.put('/admin/letters/:letterId', updateLetter)
router.delete('/admin/letters/:letterId',  destroyLetter)

export default router