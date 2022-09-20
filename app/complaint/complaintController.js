import Complaint from "./complaintModel.js";
import ComplaintResult from "../complaint_result/complaintResultModel.js";
import db from "../../database/database.js";

export const createComplaint = async (req, res) => {
	try {
		const userId = req.session.citizenId;
		await db.transaction(async (t) => {
			const payload = req.body
			const addUserLogin = { ...payload, citizenId: userId }
			// const addImage = {...addUserLogin, }
			const complaint = await Complaint.create(addUserLogin, { transaction: t })
			
			await ComplaintResult.create({
				complaintId: complaint.complaintId
			}, { transaction: t })
			return res.status(200).json({ msg: "Create Complaint", data: complaint })
		})

	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

export const getComplaintUser = async (req,res) => {
	try {
		const complaint = await Complaint.findAll({where: {citizenId: req.userId}})
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}