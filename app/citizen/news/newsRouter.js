import express from 'express'
import { getNews, getNewsById } from './newsController.js'
const router = express.Router()

router.get('/newst', getNews)
router.get('/newst/:newsId', getNewsById)

export default router