import express from 'express'
import { createLetter, destroyLetter, updateLetter } from './lettersAdminController.js'

const router = express.Router()

router.post('/admin/letters', createLetter)
router.put('/admin/letters/:letterId', updateLetter)
router.delete('/admin/letters/:letterId',  destroyLetter)

export default router