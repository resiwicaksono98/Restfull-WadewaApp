import Citizen from "../../Models/citizenModel.js";
import Complaint from "../../Models/complaintModel.js";
import ComplaintResult from "../../Models/complaintResultModel.js";
import Letters from "../../Models/lettersModel.js";
import fs from 'fs'
import db from "../../../database/database.js";
import Admin from "../../Models/adminModel.js";

export const getComplaintResult = async (req, res) => {
	try {
		const complaintRes = await ComplaintResult.findAll({
			include: [{
				model: Complaint,
				as: 'complaint',
				attributes: ['citizenId', 'complaint_type', 'description', 'image_url']
			}, {
				model: Citizen,
				as: 'citizen',
				attributes: ['name', 'nik', 'email', 'address', 'status']
			}, {
				model: Letters,
				as: 'letter',
				attributes: ['title', 'letter_number', 'village_head', 'nip']
			}, {
				model: Admin,
				as: 'admin',
				attributes: ['name', 'email']
			}]
		})
		return res.status(200).json({ msg: 'Complaint Result', data: complaintRes })
	} catch (error) {
		return res.status(500).json({ msg: error })
	}
}

export const getComplaintResultById = async (req, res) => {
	try {
		const complaintRes = await ComplaintResult.findOne({
			where: { complaintResultId: req.params.complaintResultId },
			include: [{
				model: Complaint,
				as: 'complaint',
				attributes: ['citizenId', 'complaint_type', 'description', 'image_url']
			}, {
				model: Citizen,
				as: 'citizen',
				attributes: ['name', 'nik', 'email', 'address', 'status']
			}, {
				model: Letters,
				as: 'letter',
				attributes: ['title', 'letter_number', 'village_head', 'nip']
			}, {
				model: Admin,
				as: 'admin',
				attributes: ['name', 'email']
			}]
		})
		return res.status(200).json({ msg: 'Complaint Result', data: complaintRes })
	} catch (error) {
		return res.status(500).json({ msg: error })
	}
}

export const updateComplaintResult = async (req, res) => {
	try {
		let payload = req.body
		const complaintRes = await ComplaintResult.findOne({ where: { complaintResultId: req.params.complaintResultId } })
		if (!complaintRes) return res.status(404).json({ msg: 'Not Found Complaint Result' })
		payload = { ...payload, adminId: req.session.adminId }
		if (req.file) {
			const filePath = `public/${complaintRes.files}`
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath)
			}
			payload = { ...payload, files: "images/complaintResult/" + req.file.filename }
			await ComplaintResult.update(payload, { where: { complaintResultId: complaintRes.complaintResultId } })
		} else {
			await ComplaintResult.update(payload, { where: { complaintResultId: complaintRes.complaintResultId } })
		}
		const complaintResNew = await ComplaintResult.findByPk(complaintRes.complaintResultId)
		return res.status(200).json({ msg: 'Update Success', data: complaintResNew })
	} catch (error) {
		return res.status(500).json({ msg: error })
	}
}

export const destroyComplaintResult = async (req, res) => {
	try {
		const complaintRes = await ComplaintResult.findOne({ where: { complaintResultId: req.params.complaintResultId } })
		if (!complaintRes) return res.status(404).json({ msg: 'Complaint Result not found' })
		await db.transaction(async (t) => {
			const filePath = `public/${complaintRes.files}`
			if (filePath) {
				fs.unlinkSync(filePath)
			}
			await ComplaintResult.destroy({ where: { complaintResultId: req.params.complaintResultId }, transactio: t })
			await Complaint.destroy({ where: { complaintId: complaintRes.complaintId }, transaction: t })
			return res.status(200).json({ msg: 'Delete Success' })
		})

	} catch (error) {
		return res.status(500).json({ msg: error })
	}
}