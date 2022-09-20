import express from 'express'
import { getLatterById, getLetter } from './letterController.js'
const router = express.Router()

router.get('/letters', getLetter)
router.get('/letters/:lettersId', getLatterById)


export default router