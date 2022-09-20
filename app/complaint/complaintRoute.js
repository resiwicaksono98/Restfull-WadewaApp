import express from "express";
import { verifyUserCitizen } from "../../middleware/authUser.js";
import { createComplaint } from "./complaintController.js";
const router = express.Router()

router.post('/complaints',verifyUserCitizen, createComplaint)


export default router