import Citizen from "../../Models/citizenModel.js";
import Complaint from "../../Models/complaintModel.js";
import ComplaintResult from "../../Models/complaintResultModel.js";
import Letters from "../../Models/lettersModel.js";

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
			},{
				model: Letters,
				as: 'letter',
				attributes: ['title','letter_number','village_head', 'nip']
			}]
		})
		return res.status(200).json({ msg: 'Complaint Result', data: complaintRes })
	} catch (error) {
		return res.status(500).json({ msg: error })
	}
}

export const getComplaintResultById = async (req, res) => {
	try {
		const complaintRes = await ComplaintResult.findAll({
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
				attributes: ['title','letter_number','village_head', 'nip']
			}]
		})
		return res.status(200).json({ msg: 'Complaint Result', data: complaintRes })
	} catch (error) {
		return res.status(500).json({ msg: error })
	}
}