import express from 'express'
import { destroyComplaintResult, getComplaintResult, getComplaintResultById, updateComplaintResult } from './complaintResultController.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const diskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__filename, '../../../../public/images/complaintResult'))
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
	},
})


const router = express.Router()

router.get('/admin/complaintResult', getComplaintResult)
router.get('/admin/complaintResult/:complaintResultId', getComplaintResultById)
router.delete('/admin/complaintResult/:complaintResultId', destroyComplaintResult)
router.put('/admin/complaintResult/:complaintResultId',
	multer({ storage: diskStorage }).single('files'),
	updateComplaintResult)



export default router