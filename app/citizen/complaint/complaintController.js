import Complaint from "../../Models/complaintModel.js";
import ComplaintResult from "../../Models/complaintResultModel.js";
import db from "../../../database/database.js";
import Citizen from "../../Models/citizenModel.js";
import Letters from "../../Models/lettersModel.js";
import fs from 'fs'

export const createComplaint = async (req, res) => {
	try {
		const userId = req.session.citizenId;
		await db.transaction(async (t) => {
			const payload = req.body
			const addUserLogin = { ...payload, citizenId: userId }
			const addImage = { ...addUserLogin, image_url: req.file ? "images/complaints/" + req.file.filename : null }
			const complaint = await Complaint.create(addImage, { transaction: t })

			await ComplaintResult.create({
				citizenId: userId,
				letterId: complaint.complaint_type,
				complaintId: complaint.complaintId
			}, { transaction: t })
			return res.status(200).json({ msg: "Create Complaint", data: complaint })
		})

	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

export const getComplaintUser = async (req, res) => {
	try {
		const complaint = await Complaint.findAll({
			where: { citizenId: req.userId },
			include: [{
				model: Citizen,
				as: 'citizen',
				attributes: ['name', 'nik', 'email', 'address', 'status']
			}, {
				model: Letters,
				as: 'letters',
				attributes: ['title', 'letter_number', 'village_head', 'nip']
			}]
		})
		return res.status(200).json({ msg: 'Data Complaints', data: complaint })
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

export const getComplaintUserById = async (req, res) => {
	try {
		const complaint = await Complaint.findOne({
			where: { complaintId: req.params.complaintId, citizenId: req.userId },
			include: [{
				model: Citizen,
				as: 'citizen',
				attributes: ['name', 'nik', 'email', 'address', 'status']
			}, {
				model: Letters,
				as: 'letters',
				attributes: ['title', 'letter_number', 'village_head', 'nip']
			}]
		})

		return res.status(200).json({ msg: `Data Complaint By Id`, data: complaint || "" })
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

