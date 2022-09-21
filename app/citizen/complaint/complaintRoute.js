import express from "express";
import { verifyUserCitizen } from '../../../middleware/authUser.js'
import { createComplaint, getComplaintUser, getComplaintUserById } from "./complaintController.js";
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

router.post('/complaints',
	verifyUserCitizen,
	multer({ storage: diskStorage }).single('image_url'),
	createComplaint
)
router.get('/complaints', verifyUserCitizen, getComplaintUser)
router.get('/complaints/:complaintId', verifyUserCitizen, getComplaintUserById)

export default router