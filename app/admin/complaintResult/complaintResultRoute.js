import express from 'express'
import { destroyComplaintResult, getComplaintResult, getComplaintResultById, updateComplaintResult } from './complaintResultController.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';
import { adminOnly } from '../../../middleware/authUser.js';

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

router.get('/admin/complaintResult', adminOnly, getComplaintResult)
router.get('/admin/complaintResult/:complaintResultId', adminOnly, getComplaintResultById)
router.delete('/admin/complaintResult/:complaintResultId', adminOnly, destroyComplaintResult)
router.put('/admin/complaintResult/:complaintResultId', adminOnly,
	multer({ storage: diskStorage }).single('files'),
	updateComplaintResult)



export default router