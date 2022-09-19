import express from 'express'
import { createLetter, destroyLetter, getLatterById, getLetter, updateLetter } from './letterController.js'
const router = express.Router()


router.post('/letters', createLetter)
router.get('/letters', getLetter)
router.get('/letters/:lettersId', getLatterById)
router.put('/letters/:lettersId', updateLetter)
router.delete('/letters/:lettersId', destroyLetter)


export default router