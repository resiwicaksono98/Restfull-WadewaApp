import express from 'express'
import { verifyUserCitizen } from '../../../middleware/authUser.js'
import { getLatterById, getLetter } from './letterController.js'
const router = express.Router()

router.get('/letters', verifyUserCitizen, getLetter)
router.get('/letters/:letterId', verifyUserCitizen, getLatterById)


export default router