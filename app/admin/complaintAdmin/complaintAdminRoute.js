import express from 'express'
import { destroyComplaint, updateComplaint } from './complaintAdminController.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const diskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__filename, '../../../../public/images/complaints'))
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
	},
})

const router = express.Router()

router.delete('/complaints/admin/:complaintId', destroyComplaint)
router.put('/complaints/admin/:complaintId',
	multer({ storage: diskStorage }).single('image_url'),
	updateComplaint)

export default router