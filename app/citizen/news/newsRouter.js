import express from 'express'
import { verifyUserCitizen } from '../../../middleware/authUser.js'
import { getNews, getNewsById } from './newsController.js'
const router = express.Router()

router.get('/newst', getNews)
router.get('/newst/:newsId', verifyUserCitizen, getNewsById)

export default router