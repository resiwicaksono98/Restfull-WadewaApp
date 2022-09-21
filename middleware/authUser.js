import Citizen from '../app/Models/citizenModel.js'
import Admin from '../app/Models/adminModel.js'


export const verifyUserCitizen = async (req, res, next) => {
	try {
		if (!req.session.citizenId) return res.status(401).json({ msg: 'Please Your Login Citizen' })
		const user = await Citizen.findOne({ where: {citizenId : req.session.citizenId }})
		if (!user) return res.status(404).json({ msg: 'User not found' })
		req.userId = user.citizenId
		req.role = 'citizen'
		next()
	} catch (error) {
		res.status(500).json({ msg: error.message })
	}
}
