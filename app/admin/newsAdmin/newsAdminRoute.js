import express from 'express'
import { createNewsAdmin, destroyAdminNews, getNewsAdmin, getNewsAdminById, updateNewsAdmin } from './newsAdminController.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const diskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__filename, '../../../../public/images/newst'))
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
	},
})


const router = express.Router()

router.get('/admin/newst', getNewsAdmin)
router.get('/admin/newst/:newsId', getNewsAdminById)
router.delete('/admin/newst/:newsId', destroyAdminNews)
router.post('/admin/newst',
	multer({ storage: diskStorage }).single('image_news'),
	createNewsAdmin)
router.put('/admin/newst/:newsId',
	multer({ storage: diskStorage }).single('image_news'),
	updateNewsAdmin)

export default router