import express from 'express'
import { getComplaintResult, getComplaintResultById } from './complaintResultController.js'

const router = express.Router()

router.get('/admin/complaintResult', getComplaintResult)
router.get('/admin/complaintResult/:complaintResultId', getComplaintResultById)



export default router