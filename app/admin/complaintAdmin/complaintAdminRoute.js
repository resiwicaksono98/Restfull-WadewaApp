/** @format */

import express from "express";
import { destroyComplaint, getAllComplaint, getOneComplaint, updateComplaint } from "./complaintAdminController.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { adminOnly } from "../../../middleware/authUser.js";

const __filename = fileURLToPath(import.meta.url);
const diskStorage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, path.join(__filename, "../../../../public/images/complaints"));
   },
   filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
   },
});

const router = express.Router();

router.get("/admin/complaints", adminOnly, getAllComplaint);
router.get("/admin/complaints/:complaintId", adminOnly, getOneComplaint);
router.delete("/admin/complaints/:complaintId", adminOnly, destroyComplaint);
router.put("/admin/complaints/:complaintId", adminOnly, multer({ storage: diskStorage }).single("image_url"), updateComplaint);

export default router;
