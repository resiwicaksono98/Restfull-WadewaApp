/** @format */

import express from "express";
import { verifyUserCitizen } from "../../../middleware/authUser.js";
import { getComplaintResult, getComplaintResultById } from "./complaintResultController.js";
const router = express.Router();

router.get("/complaintResult", verifyUserCitizen, getComplaintResult);
router.get("/complaintResult/:complaintResultId", verifyUserCitizen, getComplaintResultById);

export default router;
