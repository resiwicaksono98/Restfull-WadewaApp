import express from 'express'
import { createLetter, destroyLetter, updateLetter } from './lettersAdminController.js'

const router = express.Router()

router.post('/letters/admin', createLetter)
router.put('/letters/admin/:lettersId', updateLetter)
router.delete('/letters/admin/:lettersId',  destroyLetter)

export default router