/** @format */

import Complaint from "../../Models/complaintModel.js";
import Letters from "../../Models/lettersModel.js";
import Citizen from "../../Models/citizenModel.js";
import fs from "fs";
import ComplaintResult from "../../Models/complaintResultModel.js";
import db from "../../../database/database.js";

export const getAllComplaint = async (req, res) => {
   try {
      const response = await Complaint.findAll({
         include: [
            {
               model: Letters,
               as: "letters",
               attributes: ["title", "letter_number", "village_head", "nip"],
            },
            {
               model: Citizen,
               as: "citizen",
               attributes: ["name", "nik", "email", "address", "status"],
            },
         ],
      });
      return res.status(200).json({ message: "Get All Complaint", data: response });
   } catch (error) {
      return res.status(500).json({ message: error });
   }
};

export const getOneComplaint = async (req, res) => {
   try {
      const response = await Complaint.findOne({
         where: { complaintId: req.params.complaintId },
         include: [
            {
               model: Letters,
               as: "letters",
               attributes: ["title", "letter_number", "village_head", "nip"],
            },
            {
               model: Citizen,
               as: "citizen",
               attributes: ["name", "nik", "email", "address", "status"],
            },
         ],
      });
      return res.status(200).json({ message: "Get One Complaint", data: response });
   } catch (error) {
      return res.status(500).json({ message: error });
   }
};

export const updateComplaint = async (req, res) => {
   try {
      const payload = req.body;
      const complaint = await Complaint.findOne({ where: { complaintId: req.params.complaintId } });
      if (!complaint) return res.status(404).json({ msg: "Complaint not found" });
      let complaintRes;
      if (req.file) {
         const imagePath = `public/${complaint.image_url}`;
         if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
         }
         complaintRes = await Complaint.update(
            {
               ...payload,
               image_url: "images/complaints/" + req.file.filename,
            },
            { where: { complaintId: complaint.complaintId } }
         );
      } else {
         complaintRes = await Complaint.update(payload, { where: { complaintid: complaint.complaintId } });
      }
      return res.status(200).json({ msg: "Update Complaint Success", data: complaintRes });
   } catch (error) {
      return res.status(500).json({ msg: error.message });
   }
};

export const destroyComplaint = async (req, res) => {
   try {
      const complaint = await Complaint.findByPk(req.params.complaintId);
      if (!complaint) return res.status(404).json({ msg: "Complaint not found" });
      if (complaint.image_url) {
         fs.unlinkSync(`public/${complaint.image_url}`);
      }
      await db.transaction(async (t) => {
         const delComplaint = await Complaint.destroy({
            where: { complaintId: complaint.complaintId },
            transaction: t,
         });
         await ComplaintResult.destroy({
            where: { complaintId: complaint.complaintId },
            transaction: t,
         });
         return res.status(200).json({ msg: "Delete Complaint", data: delComplaint });
      });
      return res.status(200).json({ msg: "Delete Success", data: result });
   } catch (error) {
      return res.status(500).json({ msg: error.message });
   }
};
